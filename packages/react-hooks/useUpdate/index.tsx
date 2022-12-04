import { useCallback, useState } from 'react';

export const useUpdate = () => {
  const [, setUp] = useState({});
  return useCallback(() => setUp({}), []);
};
