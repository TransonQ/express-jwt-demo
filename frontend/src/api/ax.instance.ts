import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { CookieKeys, cookies } from '../utils/cookies';
import { postRefrehToken } from './examples.api';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 创建axios实例
const ax = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 请求拦截器
ax.interceptors.request.use(onRequest, onRequestError);

// 响应拦截器
ax.interceptors.response.use(onResponse, onResponseError);

// 公共的请求拦截器
function onRequest(config: CustomAxiosRequestConfig) {
  // handleExampleRequest(config);
  const accessToken = cookies.get(CookieKeys['ACCESS-TOKEN']);
  config.headers['Authorization'] = accessToken;
  return config;
}
// 公共的请求错误拦截器
function onRequestError(error: AxiosError) {
  // hanldeExampleError(error);
  return Promise.reject(error);
}

// 公共的响应拦截器
function onResponse(response: AxiosResponse) {
  // hanldeExampleError(error);
  return response;
}
// 公共的响应错误拦截器
async function onResponseError(error: AxiosError) {
  const originalRequest = error.config as CustomAxiosRequestConfig;

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
      window.location.href = '/login';
    }
  }

  // other error handling ... ...
  // // hanldeExampleError(error);

  return Promise.reject(error);
}

export { ax };
