import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useUnmount } from '.';

const setUp = (fn: () => void) => renderHook(() => useUnmount(fn));

describe('useUnMount', () => {
  it('should be work', () => {
    const mockFn = vi.fn();
    const hook = setUp(mockFn);
    expect(mockFn).toHaveBeenCalledTimes(0);
    hook.rerender();
    expect(mockFn).toHaveBeenCalledTimes(0);
    hook.unmount();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
