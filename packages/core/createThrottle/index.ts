export const createThrottle = (fn: Function, delay: number = 500) => {
  let timer: any = null;

  return () => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn();
      timer = null;
    }, delay);
  };
};
