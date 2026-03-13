import { apiClient } from '@/api/client';

export const publicStoreRepository = {
  async getTheme() {
    return (await apiClient.theme()) as any;
  },
  async getProducts(params: { pageNumber: number; pageSize: number; search?: string; sortBy?: string; sortDirection?: string }) {
    return (await apiClient.public(params.pageNumber, params.pageSize, params.search, params.sortBy, params.sortDirection)) as any;
  },
  async getProductDetail(id: string) {
    return (await apiClient.public2(id)) as any;
  },
};
