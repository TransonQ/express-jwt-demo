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

export const postRefrehToken = () =>
  ax.request({
    method: 'POST',
    url: '/token',
    data: {},
  });

export const getProtectedInfo = (params?: Record<string, any>) =>
  ax.request({
    method: 'GET',
    url: '/protected',
    params,
  });
