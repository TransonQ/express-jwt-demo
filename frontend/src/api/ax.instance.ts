import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { CookieKeys, cookies } from '../utils/cookies';

// 创建axios实例
const ax = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 请求拦截器
ax.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = cookies.get(CookieKeys['ACCESS-TOKEN']);
    config.headers['Authorization'] = accessToken;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
ax.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export { ax };
