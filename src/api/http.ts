import axios from 'axios';
import { env } from '@/env';

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  transformResponse: [(data) => data],
});

http.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers['X-Tenant-Id'] = '6ee5fe60-d3ae-4f7f-870f-155bfd6ebd18';

  const token = localStorage.getItem('buyer_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
