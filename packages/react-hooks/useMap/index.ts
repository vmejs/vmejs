import { useMemo, useState } from 'react';

interface Actions<K, T> {
  set: (key: K, value: T) => void;
  setAll: (newMap: Iterable<readonly [K, T]>) => void;
  remove: (key: K) => void;
  reset: () => void;
  get: (key: K) => void;
}

export function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
  const getInitialValue = () => {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  };

  const [map, setMap] = useState<Map<K, T>>(() => getInitialValue());

  const set = (key: K, value: T) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.set(key, value);
      return temp;
    });
  };

  const setAll = (newMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(newMap));
  };

  const remove = (key: K) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setMap(getInitialValue());

  const get = (key: K) => map.get(key);

  const actions: Actions<K, T> = useMemo(() => {
    return {
      set,
      setAll,
      remove,
      reset,
      get,
    };
  }, [set, setAll, remove, reset, get]);

  return [map, actions] as const;
}
