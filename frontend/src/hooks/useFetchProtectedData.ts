import useSWR from 'swr';
import { getProtectedInfo } from '../api/examples.api';

export enum FetchKeys {
  'PROTECTED' = 'protected',
}

export function useFetchProtectedData(params?: Record<string, any>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    {
      key: FetchKeys.PROTECTED,
      params,
    },
    ({ params }) => getProtectedInfo(params),
    {
      refreshInterval: 10 * 1000,
      keepPreviousData: false,
      onError() {
        mutate(undefined, false);
      },
    },
  );

  return {
    reponse: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
