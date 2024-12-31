import { useFetchHello } from '../hooks/useFetchHello';

export function Home() {
  useFetchHello();
  return (
    <div className="bg-orange-400 text-white rounded-2xl p-4 mt-4 mx-4">
      Home
    </div>
  );
}
