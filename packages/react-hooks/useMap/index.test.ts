import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useMap } from '../useMap';

const setUp = (initialValue?: Iterable<readonly [any, any]>) => renderHook(() => useMap(initialValue));

describe('React Hook useMap', () => {
  it('should be map default value', () => {
    expect(useMap).toBeDefined();
  });

  it('should be actions && initialValue', () => {
    const { result } = setUp([
      ['key', 'value'],
      ['a', 1],
    ]);
    const [map, actions] = result.current;
    expect([...map]).toEqual([
      ['key', 'value'],
      ['a', 1],
    ]);

    expect(actions).toStrictEqual({
      set: expect.any(Function),
      setAll: expect.any(Function),
      remove: expect.any(Function),
      reset: expect.any(Function),
      get: expect.any(Function),
    });
  });

  it('should be get value', () => {
    const { result } = setUp([
      ['key', 'value'],
      ['a', 1],
    ]);
    let value;
    act(() => {
      value = result.current[1].get('a');
    });
    expect(value).toEqual(1);
  });

  it('should be get no key', () => {
    const { result } = setUp([
      ['key', 'value'],
      ['a', 1],
    ]);
    let value;
    act(() => {
      value = result.current[1].get('non-key');
    });
    expect(value).toBeUndefined();
  });

  it('should be set value', () => {
    const { result } = setUp([
      ['key', 'value'],
      ['a', 1],
    ]);
    act(() => {
      result.current[1].set('ww', 'value_ww');
    });
    expect([...result.current[0]]).toEqual([
      ['key', 'value'],
      ['a', 1],
      ['ww', 'value_ww'],
    ]);
  });

  it('should be set newMap', () => {
    const { result } = setUp([
      ['key', 'value'],
      ['a', 1],
    ]);
    act(() => {
      result.current[1].setAll([['bar', 'true']]);
    });
    expect([...result.current[0]]).toEqual([['bar', 'true']]);
  });

  it('should be reset map', () => {
    const { result } = setUp([['key', 'value']]);
    act(() => {
      result.current[1].set('val', '999');
    });
    expect([...result.current[0]]).toEqual([
      ['key', 'value'],
      ['val', '999'],
    ]);
    act(() => {
      result.current[1].reset();
    });
    expect([...result.current[0]]).toEqual([['key', 'value']]);
  });

  it('should be reset initial value', () => {
    const { result } = setUp();
    act(() => {
      result.current[1].reset();
    });
    expect([...result.current[0]]).toEqual([]);
  });

  it('should be remove map', () => {
    const { result } = setUp([
      ['key', 'value'],
      ['a', 1],
    ]);
    act(() => {
      result.current[1].remove('key');
    });
    expect([...result.current[0]]).toEqual([['a', 1]]);
  });
});
