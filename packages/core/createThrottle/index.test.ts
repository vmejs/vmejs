import { expect, describe, it } from 'vitest';
import { createThrottle } from '.';

describe('Throttle test', () => {
  it('Throttle push three Array Item', () => {
    const delay = 100;
    const TestArray: number[] = [];
    const pushArrayItem = createThrottle(() => {
      TestArray.push(1);
    }, delay);
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        pushArrayItem();
      }, 50);
    }
    setTimeout(() => {
      expect(TestArray.length).toEqual(3);
    }, delay * 6);
  });
});
