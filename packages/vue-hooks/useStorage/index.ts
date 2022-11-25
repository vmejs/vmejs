import { createStorage, IStorageOption } from '@vmejs/core';
import { isFunction } from '@vmejs/shared';
import { ref, shallowRef } from 'vue-demi';
import { Awaitable, ConfigurableFlush, MaybeComputedRef, RemovableRef } from '../types';
import { resolveUnref } from '../unrefElement';
import { useEventListener } from '../useEventListener';
import type { ConfigurableWindow } from '../_configurable';
import { defaultWindow } from '../_configurable';
import { guessSerializerType } from './guess';

export interface Serializer<T> {
  read(raw: string): T;
  write(value: T): string;
}

export interface SerializerAsync<T> {
  read(raw: string): Awaitable<T>;
  write(value: T): Awaitable<string>;
}

export const StorageSerializers: Record<'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date', Serializer<any>> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from((v as Map<any, any>).entries())),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
};

export interface UseStorageOptions<T> extends ConfigurableWindow, ConfigurableFlush, IStorageOption {
  /**
   * Watch for deep changes
   *
   * @default true
   */
  deep?: boolean;

  /**
   * Listen to storage changes, useful for multiple tabs application
   *
   * @default true
   */
  listenToStorageChanges?: boolean;

  /**
   * Write the default value to the storage when it does not exist
   *
   * @default true
   */
  writeDefaults?: boolean;

  /**
   * Merge the default value with the value read from the storage.
   *
   * When setting it to true, it will perform a **shallow merge** for objects.
   * You can pass a function to perform custom merge (e.g. deep merge), for example:
   *
   * @default false
   */
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T);

  /**
   * Custom data serialization
   */
  serializer?: Serializer<T>;

  /**
   * On error callback
   *
   * Default log error to `console.error`
   */
  onError?: (error: unknown) => void;

  /**
   * Use shallow ref as reference
   *
   * @default false
   */
  shallow?: boolean;
}

// export interface Storage {
//   getItem(key: string): string | null;
//   setItem(key: string, value: string): void;
//   removeItem(key: string): void;
// }

export function useStorage(
  key: string,
  defaults: MaybeComputedRef<string>,
  storage?: Storage,
  options?: UseStorageOptions<string>,
): RemovableRef<string>;
export function useStorage(
  key: string,
  defaults: MaybeComputedRef<boolean>,
  storage?: Storage,
  options?: UseStorageOptions<boolean>,
): RemovableRef<boolean>;
export function useStorage(
  key: string,
  defaults: MaybeComputedRef<number>,
  storage?: Storage,
  options?: UseStorageOptions<number>,
): RemovableRef<number>;
export function useStorage<T>(
  key: string,
  defaults: MaybeComputedRef<T>,
  storage?: Storage,
  options?: UseStorageOptions<T>,
): RemovableRef<T>;
export function useStorage<T = unknown>(
  key: string,
  defaults: MaybeComputedRef<null>,
  storage?: Storage,
  options?: UseStorageOptions<T>,
): RemovableRef<T>;

/**
 * Reactive LocalStorage/SessionStorage.
 *
 * @see https://vueuse.org/useStorage
 */
export function useStorage<T extends string | number | boolean | object | null>(
  key: string,
  defaults: MaybeComputedRef<T>,
  storage: Storage | undefined,
  options: UseStorageOptions<T> = {},
): RemovableRef<T> {
  const {
    flush = 'pre',
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window = defaultWindow,
    // eventFilter,
    onError = (e) => {
      // console.error(e);
    },
    iv,
    hasEncrypt = true,
    prefixKey = '',
    timeout,
  } = options;

  const data = (shallow ? shallowRef : ref)(defaults) as RemovableRef<T>;

  if (!storage) {
    try {
      storage = defaultWindow?.localStorage;
    } catch (e) {
      onError(e);
    }
  }

  if (!storage) return data;

  const rawInit: T = resolveUnref(defaults);
  const type = guessSerializerType<T>(rawInit);
  const serializer = options.serializer ?? StorageSerializers[type];

  // const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(data, () => write(data.value), { flush, deep, eventFilter });

  if (window && listenToStorageChanges) useEventListener(window, 'storage', update);

  update();

  return data;

  function write(v: unknown) {
    try {
      if (v == null) storage!.removeItem(key);
      else storage!.setItem(key, serializer.write(v));
    } catch (e) {
      onError(e);
    }
  }

  function read(event?: StorageEvent) {
    // pauseWatch();
    try {
      const currStorage = createStorage({ storage, hasEncrypt, iv, key: options.key, prefixKey, timeout });

      const rawValue = event ? event.newValue : currStorage.getKey(key);

      if (rawValue == null) {
        if (writeDefaults && rawInit !== null) currStorage!.setKey(key, serializer.write(rawInit), timeout);
        return rawInit;
      } else if (!event && mergeDefaults) {
        const value = serializer.read(rawValue);
        if (isFunction(mergeDefaults)) return mergeDefaults(value, rawInit);
        else if (type === 'object' && !Array.isArray(value)) return { ...(rawInit as any), ...value };
        return value;
      } else if (typeof rawValue !== 'string') {
        return rawValue;
      } else {
        return serializer.read(rawValue);
      }
    } catch (e) {
      onError(e);
    } finally {
      // resumeWatch();
    }
  }

  function update(event?: StorageEvent) {
    if (event && event.storageArea !== storage) return;

    if (event && event.key === null) {
      data.value = rawInit;
      return;
    }

    if (event && event.key !== key) return;

    data.value = read(event);
  }
}
