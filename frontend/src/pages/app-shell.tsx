import { Link } from 'react-router';
import { useFetchProtectedData } from '../hooks';

export function AppShell() {
  const { reponse, error, isLoading, isValidating } = useFetchProtectedData({
    msg: 'This is a request with Authentication',
  });

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
      {!reponse ? null : (
        <pre className="p-4 border border-orange-400 rounded-2xl m-4">
          {JSON.stringify(reponse.data, null, 2)}
        </pre>
      )}
    </>
  );
}
