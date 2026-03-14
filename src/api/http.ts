import axios from 'axios';
import { env } from '@/env';

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  transformResponse: [(data) => data],
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('buyer_access_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
