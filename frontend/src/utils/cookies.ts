import Cookies from 'js-cookie';

export const cookies = Cookies;

export enum CookieKeys {
  'ACCESS-TOKEN' = 'jwt_demo_access_token',
  'REFRESH-TOKEN' = 'jwt_demo_refresh_token',
}
