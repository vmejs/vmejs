import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useUpdate } from '.';

describe('useUnMount', () => {
  it('should be default', () => {
    expect(useUpdate).toBeDefined();
  });

  it('should be work', () => {
    let count = 0;
    const hook = renderHook(() => {
      const update = useUpdate();
      return {
        count,
        add: () => {
          count++;
          update();
        },
      };
    });
    expect(hook.result.current.count).toEqual(0);
    act(hook.result.current.add);
    expect(hook.result.current.count).toEqual(1);
  });
});
