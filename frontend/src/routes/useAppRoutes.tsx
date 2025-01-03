import { redirect, RouteObject } from 'react-router';
import { AppShell } from '../pages/app-shell';
import { Login } from '../pages/login';

type AppRoute = RouteObject & {};

export function useAppRoutes(): AppRoute[] {
  return [
    {
      path: '/',
      loader: () => redirect('/login'),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/app',
      element: <AppShell />,
    },
  ];
}
