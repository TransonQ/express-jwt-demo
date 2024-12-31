import { useFetchHello } from '../hooks/useFetchHello';

export function Home() {
  useFetchHello();
  return <div className="text-orange-400">Home</div>;
}
