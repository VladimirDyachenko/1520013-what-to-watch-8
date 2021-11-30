import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BACKEND_URL, HttpCode, REQUEST_TIMEOUT } from '../utils/const';
import { getToken } from './token';

type UnauthorizedCallback = () => void;

export const createAPI = (
  onUnauthorized: UnauthorizedCallback,
): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (requestConfig: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        requestConfig.headers['x-token'] = token;
      }

      return requestConfig;
    },
  );

  return api;
};
