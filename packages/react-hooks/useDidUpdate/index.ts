import { DependencyList, useEffect, useRef } from 'react';

export const useDidUpdate = (fn: () => void, deps?: DependencyList) => {
  const firstRef = useRef(false);

  useEffect(
    () => () => {
      firstRef.current = false;
    },
    [],
  );

  useEffect(() => {
    if (!firstRef.current) {
      firstRef.current = true;
    } else {
      return fn?.();
    }
  }, deps);
};
