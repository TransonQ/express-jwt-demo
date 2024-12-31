import { Link } from 'react-router';

export function AppShell() {
  return (
    <>
      <div className="rounded-2xl border border-orange-400 text-orange-400 m-4 p-4 flex ">
        <span>{'Protected Data'}</span>
        <Link to={'/login'} className="ml-auto hover:underline">
          {'Back to Login'}
        </Link>
      </div>
      <pre></pre>
    </>
  );
}
