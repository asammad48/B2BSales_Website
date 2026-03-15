import axios from 'axios';
import { env } from '@/env';
import { showErrorToast } from '@/lib/toast';

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  transformResponse: [(data) => data],
});

http.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (env.tenantId) {
    config.headers['X-Tenant-Id'] = env.tenantId;
  }

  const token = localStorage.getItem('buyer_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const skipGlobalToast = error?.config?.skipGlobalErrorToast;
    if (!skipGlobalToast) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        error?.response?.data?.error ||
        error?.message ||
        'Something went wrong. Please try again.';

      showErrorToast(message);
    }

    return Promise.reject(error);
  },
);
