import { useCallback, useEffect } from 'react';
import { getHello } from '../api/examples.api';

export function useFetchHello() {
  const fetcher = useCallback(async () => {
    const response = await getHello();

    return response;
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);
}
