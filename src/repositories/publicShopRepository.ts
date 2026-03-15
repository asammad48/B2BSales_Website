import { apiClient } from '@/api/client';
import type {
  PublicShopLookupItemDto,
  PublicShopLookupItemDtoIEnumerableApiResponse,
} from '@/api/generated/apiClient';

type ApiResponse<T> = { success?: boolean; message?: string; data?: T };

function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }

  return response.data;
}

export const publicShopRepository = {
  async getPublicTenantShops(tenantId: string): Promise<PublicShopLookupItemDto[]> {
    const response = await apiClient.shops(tenantId);
    return unwrapResponse<PublicShopLookupItemDto[]>(response as PublicShopLookupItemDtoIEnumerableApiResponse);
  },
};

