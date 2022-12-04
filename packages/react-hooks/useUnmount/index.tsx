import { useEffect } from 'react';

export const useUnmount = (fn: () => void) => {
  useEffect(
    () => () => {
      fn();
    },
    [],
  );
};
