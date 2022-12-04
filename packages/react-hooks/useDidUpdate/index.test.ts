import { useDidUpdate } from './index';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

const setUp = (fn: () => void) => renderHook(() => useDidUpdate(fn));

describe('useDidUpdate', () => {
  it('should to defined', () => {
    expect(useDidUpdate).toBeDefined();
  });

  it('should to work', () => {
    const mockFn = vi.fn();
    const hook = setUp(mockFn);
    expect(mockFn).toBeCalledTimes(0);
    hook.rerender();
    expect(mockFn).toBeCalledTimes(1);
    hook.rerender();
    expect(mockFn).toBeCalledTimes(2);
    hook.unmount();
    expect(mockFn).toBeCalledTimes(2);
  });
});
