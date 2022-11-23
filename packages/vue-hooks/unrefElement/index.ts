import type { ComponentPublicInstance } from 'vue-demi';
import { unref } from 'vue-demi';
// overwrite
import type { MaybeComputedRef, MaybeRef } from '../types';

/**
 * Get the value of value/ref/getter.
 * overwrite
 */
export function resolveUnref<T>(r: MaybeComputedRef<T>): T {
  return typeof r === 'function' ? (r as any)() : unref(r);
}

export type VueInstance = ComponentPublicInstance;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>;
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeComputedRef<T>;
export type MaybeElement = HTMLElement | SVGElement | VueInstance | undefined | null;

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends VueInstance
  ? Exclude<MaybeElement, VueInstance>
  : T | undefined;

/**
 * Get the dom element of a ref of element or Vue component instance
 *
 * @param elRef
 */
export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
  const plain = resolveUnref(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}
