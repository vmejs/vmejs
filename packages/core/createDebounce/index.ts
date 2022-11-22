export const createDebounce = (fn: Function, waittime: number = 500) => {
  let timer: any = null;

  return () => {
    timer === null ? setTimeout(fn, waittime) : clearTimeout(timer);
  };
};
