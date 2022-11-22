import { expect, describe, it } from 'vitest';
import { createDebounce } from '.';

describe('Debounce test', () => {
  it('Debounce push one Array item', () => {
    const waitTime = 100;
    const TestArray: number[] = [];
    const pushArrayItem = createDebounce(() => {
      TestArray.push(1);
    }, waitTime);

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        pushArrayItem();
      }, waitTime / 2);
    }
    setTimeout(() => {
      expect(TestArray.length).toEqual(1);
    }, waitTime);
  });
});
