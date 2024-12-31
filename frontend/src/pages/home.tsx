import { Outlet } from 'react-router';
import { useFetchHello } from '../hooks/useFetchHello';

export function Home() {
  useFetchHello();
  return (
    <>
      <div className="border border-orange-400 text-orange-400 rounded-2xl p-4 mt-4 mx-4">
        Login
      </div>
      <Outlet />
    </>
  );
}
