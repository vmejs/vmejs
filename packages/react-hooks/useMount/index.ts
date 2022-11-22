import { useEffect } from 'react';
import { isFunction } from '@vmejs/shared';

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

export const useMount = (fn: () => void) => {
  if (isDev) {
    if (!isFunction(fn)) {
      // eslint-disable-next-line no-console
      console.error(`useMount: parameter \`fn\` expected to be a function, but got "${typeof fn}".`);
    }
  }

  useEffect(() => {
    fn?.();
  }, []);
};
