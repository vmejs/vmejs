import { encrypt, decrypt, isString, IEncryptionParams } from '@vmejs/shared';
import pack from '../package.json';

const DEFAULT_EXPIRE = 24 * 60 * 60 * 1000;

interface IStorageRes {
  value: string;
  time: number;
  expire: number;
}

export interface IStorageOption extends IEncryptionParams {
  storage?: Storage;
  prefixKey?: string;
  timeout?: number;
  hasEncrypt?: boolean;
}

const DEFAULT_PREFIX = 'vme_' + pack.version;

export const createStorage = (
  option: Partial<IStorageOption> = {
    storage: localStorage,
    prefixKey: DEFAULT_PREFIX,
    hasEncrypt: true,
    timeout: DEFAULT_EXPIRE,
  },
) => {
  class VmeStorage {
    private storage: Storage;
    private prefix: string;
    private hasEncrypt: boolean;

    private autoGenKey(key: string) {
      return `${this.prefix}${key}`.toUpperCase();
    }

    constructor() {
      if (option.iv && option.iv.length !== 16) throw new Error('iv length must 16');
      if (option.key && option.key.length !== 16) throw new Error('iv length must 16');
      this.storage = option.storage!;
      this.prefix = option.prefixKey!;
      this.hasEncrypt = option.hasEncrypt!;
    }

    public setKey(k: string, v: any, expire: number = DEFAULT_EXPIRE): void {
      const val = typeof isString(v) ? v : JSON.stringify(v);

      if (isNaN(expire) || expire < 0) throw new Error('Expire must be a number');

      const data: IStorageRes = {
        value: val,
        time: Date.now(),
        expire: expire ? expire : DEFAULT_EXPIRE!,
      };

      const targetValue = this.hasEncrypt ? encrypt(data, { key: option.key, iv: option.iv }) : JSON.stringify(data);

      this.storage.setItem(this.autoGenKey(k), targetValue as string);
    }

    public getKey(k: string): any {
      const targetKey = this.autoGenKey(k);

      const raw = this.storage.getItem(targetKey);

      if (!raw) {
        return null;
      }

      const res: IStorageRes = this.hasEncrypt ? JSON.parse(decrypt(raw, { key: option.key!, iv: option.iv! })) : JSON.parse(raw);

      const nowTime = Date.now();

      if (res.expire && option.timeout! * 6000 < nowTime - res.time) {
        this.removeKey(targetKey);
        return null;
      }

      this.setKey(k, res.value, res.expire);
      return res.value;
    }

    public removeKey(key: string): void {
      this.storage.removeItem(key);
    }

    public clear() {
      this.storage.clear();
    }
  }

  return new VmeStorage();
};

export const getStorageLen = (storage: Storage = localStorage) => {
  return storage.length;
};

export const getStorageAll = (storage: Storage = localStorage) => {
  const len = getStorageLen(storage);
  const arr = new Array();
  for (let i = 0; i < len; i++) {
    const key = storage.key(i);

    const val = storage.getItem(key!);

    arr[i] = { key, val };
  }
  return arr;
};
