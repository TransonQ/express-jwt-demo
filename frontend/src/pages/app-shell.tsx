import { Link } from 'react-router';
import { useFetchProtectedData } from '../hooks';

export function AppShell() {
  const {
    reponse: reponse1,
    error: error1,
    isValidating: isFetching1,
  } = useFetchProtectedData({
    msg: 'example_1',
  });

  const errors = [error1];
  const reponses = [reponse1];
  const loading = isFetching1;

  return (
    <>
      <div className="rounded-2xl border border-orange-400 text-orange-400 m-4 p-4 flex ">
        <span>{'Protected Data'}</span>
        <Link to={'/login'} className="ml-auto hover:underline">
          {'Back to Login'}
        </Link>
      </div>

      <p className="h-2 mx-4">{loading && 'loaidng...'}</p>

      {errors.map((error, index) =>
        !error ? null : (
          <pre
            key={index}
            className="p-4 border border-red-500 rounded-2xl m-4"
          >
            {JSON.stringify(
              {
                error: error.message,
                status: error.status,
              },
              null,
              2,
            )}
          </pre>
        ),
      )}

      {reponses.map((reponse, index) =>
        !reponse ? null : (
          <pre
            key={index}
            className="p-4 border border-green-500 rounded-2xl m-4"
          >
            {JSON.stringify(reponse.data, null, 2)}
          </pre>
        ),
      )}
    </>
  );
}
