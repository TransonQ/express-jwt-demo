import { ax } from './ax.instance';

export function getHello() {
  return ax.get('/');
}

export const postLogin = (username: string) =>
  ax.request({
    method: 'POST',
    url: '/login',
    data: { username },
  });

export const postRefrehToken = (refresh_token: string) =>
  ax.request({
    method: 'POST',
    url: '/token',
    data: { refresh_token },
  });

export const getProtectedInfo = (params?: Record<string, any>) =>
  ax.request({
    method: 'GET',
    url: '/protected',
    params,
  });
