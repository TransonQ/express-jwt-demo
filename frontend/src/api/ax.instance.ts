import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig as OriginalInternalAxiosRequestConfig,
} from 'axios';
import { CookieKeys, cookies } from '../utils/cookies';
import { postRefrehToken } from './examples.api';

interface InternalAxiosRequestConfig
  extends OriginalInternalAxiosRequestConfig {
  _retry?: boolean;
}

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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = cookies.get(CookieKeys['REFRESH-TOKEN']);
        if (!refreshToken) return;
        const axiosResponse = await postRefrehToken(refreshToken);
        const { data } = axiosResponse;

        cookies.set(CookieKeys['ACCESS-TOKEN'], data.accessToken);
        cookies.set(CookieKeys['REFRESH-TOKEN'], data.refreshToken);

        // Retry the original request with the new token
        // 重新发起请求
        originalRequest.headers.Authorization = data.accessToken;

        // 返回重新发起请求的结果
        return ax(originalRequest);
      } catch {
        // Handle refresh token error or redirect to login
      }
    }
    return Promise.reject(error);
  },
);

export { ax };
