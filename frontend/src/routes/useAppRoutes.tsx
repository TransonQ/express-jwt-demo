import { RouteObject } from 'react-router';
import { Home } from '../pages/home';

export function useAppRoutes(): RouteObject[] {
  return [
    {
      path: '/',
      element: <Home />,
    },
  ];
}
