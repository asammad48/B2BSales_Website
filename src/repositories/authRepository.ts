import { apiClient } from '@/api/client';

export const authRepository = {
  async login(body: any) {
    return (await apiClient.login(body)) as any;
  },
  async me() {
    return (await apiClient.me()) as any;
  },
};
