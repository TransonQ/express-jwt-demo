import { useCallback, useEffect } from 'react';
import { getHello } from '../api/hello.api';

export function useFetchHello() {
  const fetcher = useCallback(async () => {
    const response = await getHello();

    return response;
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);
}
