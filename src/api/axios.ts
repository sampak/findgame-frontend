import axios from 'axios';
import { getToken } from './user';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API ?? 'http://localhost:8080',
  headers: {
    'content-type': 'application/json',
  },
});

const reqInterceptor = async (config: any) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.authorization = "Bearer " + await getToken();
  return config;
};

axiosInstance.interceptors.request.use(reqInterceptor);
