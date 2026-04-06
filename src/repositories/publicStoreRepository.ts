import { apiClient } from '@/api/client';
import type {
  ProductDetailResponseDto,
  ProductDetailResponseDtoApiResponse,
  ProductListItemResponseDtoPageResponse,
  ProductListItemResponseDtoPageResponseApiResponse,
  PublicTenantClientInfoResponseDto,
  PublicTenantClientInfoResponseDtoApiResponse,
  ThemeResponseDto,
  ThemeResponseDtoApiResponse,
} from '@/api/generated/apiClient';

function unwrapResponse<T>(response: { success?: boolean; message?: string; data?: T }): T {
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }

  return response.data;
}

export const publicStoreRepository = {

  async getClientInfo(tenantId: string): Promise<PublicTenantClientInfoResponseDto> {
    const response = await apiClient.clientInfo(tenantId);
    return unwrapResponse<PublicTenantClientInfoResponseDto>(response as PublicTenantClientInfoResponseDtoApiResponse);
  },
  async getTheme(): Promise<ThemeResponseDto> {
    const response = await apiClient.theme();
    return unwrapResponse<ThemeResponseDto>(response as ThemeResponseDtoApiResponse);
  },
  async getProducts(params: { pageNumber: number; pageSize: number; search?: string; sortBy?: string; sortDirection?: string }): Promise<ProductListItemResponseDtoPageResponse> {
    const response = await apiClient.public(params.pageNumber, params.pageSize, params.search, params.sortBy, params.sortDirection);
    return unwrapResponse<ProductListItemResponseDtoPageResponse>(response as ProductListItemResponseDtoPageResponseApiResponse);
  },
  async getProductDetail(id: string): Promise<ProductDetailResponseDto> {
    const response = await apiClient.public2(id);
    return unwrapResponse<ProductDetailResponseDto>(response as ProductDetailResponseDtoApiResponse);
  },
};
