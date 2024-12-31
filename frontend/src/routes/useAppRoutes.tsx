import { RouteObject } from 'react-router';
import { AppShell } from '../pages/app-shell';
import { Home } from '../pages/home';
import { Login } from '../pages/login';

export function useAppRoutes(): RouteObject[] {
  return [
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
    {
      path: '/app',
      element: <AppShell />,
    },
  ];
}
