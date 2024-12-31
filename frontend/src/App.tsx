import { createBrowserRouter, RouterProvider } from 'react-router';
import { useAppRoutes } from './routes/useAppRoutes';

export function App() {
  const routes = useAppRoutes();
  const browserRouters = createBrowserRouter(routes);
  return <RouterProvider router={browserRouters}></RouterProvider>;
}
