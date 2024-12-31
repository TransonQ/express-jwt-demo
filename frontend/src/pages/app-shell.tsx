import { Link } from 'react-router';
import { useFetchProtectedData } from '../hooks';

export function AppShell() {
  const { data, error, isLoading, isValidating } = useFetchProtectedData();

  return (
    <>
      <div className="rounded-2xl border border-orange-400 text-orange-400 m-4 p-4 flex ">
        <span>{'Protected Data'}</span>
        <Link to={'/login'} className="ml-auto hover:underline">
          {'Back to Login'}
        </Link>
      </div>

      <p className="h-2 mx-4">{(isLoading || isValidating) && 'loaidng...'}</p>

      {!error ? null : (
        <pre className="p-4 border border-red-500 rounded-2xl m-4">
          {JSON.stringify(
            {
              error: error.message,
              status: error.status,
            },
            null,
            2,
          )}
        </pre>
      )}
      {!data ? null : (
        <pre className="p-4 border border-orange-500 rounded-2xl m-4">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </>
  );
}
