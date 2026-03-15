import { apiClient } from '@/api/client';
import type {
  PublicCatalogFiltersResponseDto,
  PublicCatalogFiltersResponseDtoApiResponse,
  PublicProductListItemDtoPageResponse,
  PublicProductListItemDtoPageResponseApiResponse,
} from '@/api/generated/apiClient';

type ApiResponse<T> = { success?: boolean; message?: string; data?: T };

function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }

  return response.data;
}

export type GetPublicProductsParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  modelId?: string;
  partTypeId?: string;
  sortBy?: string;
  sortDirection?: string;
};

function normalizeOptional(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const publicCatalogRepository = {
  async getPublicCatalogFilters(): Promise<PublicCatalogFiltersResponseDto> {
    const response = await apiClient.filters();
    return unwrapResponse<PublicCatalogFiltersResponseDto>(response as PublicCatalogFiltersResponseDtoApiResponse);
  },

  async getPublicProducts(params: GetPublicProductsParams): Promise<PublicProductListItemDtoPageResponse> {
    const response = await apiClient.products3(
      normalizeOptional(params.search),
      normalizeOptional(params.categoryId),
      normalizeOptional(params.brandId),
      normalizeOptional(params.modelId),
      normalizeOptional(params.partTypeId),
      params.pageNumber,
      params.pageSize,
      params.sortBy,
      params.sortDirection,
    );

    return unwrapResponse<PublicProductListItemDtoPageResponse>(response as PublicProductListItemDtoPageResponseApiResponse);
  },
};
