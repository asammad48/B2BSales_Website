import { apiClient } from '@/api/client';
import type {
  PublicCatalogFiltersResponseDto,
  PublicCatalogFiltersResponseDtoApiResponse,
  PublicNewArrivalProductItemDtoPageResponse,
  PublicNewArrivalProductItemDtoPageResponseApiResponse,
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
  categoryIds?: string[];
  brandIds?: string[];
  modelIds?: string[];
  partTypeIds?: string[];
  shopId?: string;
  sortBy?: string;
  sortDirection?: string;
};

export type GetNewArrivalProductsParams = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  modelId?: string;
  partTypeId?: string;
  shopId?: string;
  sortBy?: string;
  sortDirection?: string;
};

export type GetFeaturedProductsParams = {
  shopId: string;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
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

function normalizeOptionalList(values?: string[]): string[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  const cleaned = values
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  return cleaned.length > 0 ? cleaned : undefined;
}

export const publicCatalogRepository = {
  async getPublicCatalogFilters(): Promise<PublicCatalogFiltersResponseDto> {
    const response = await apiClient.filters();
    return unwrapResponse<PublicCatalogFiltersResponseDto>(response as PublicCatalogFiltersResponseDtoApiResponse);
  },

  async products2(params: GetPublicProductsParams): Promise<PublicProductListItemDtoPageResponse> {
    const response = await apiClient.products2(
      normalizeOptional(params.search),
      undefined,
      undefined,
      undefined,
      undefined,
      normalizeOptionalList(params.categoryIds),
      normalizeOptionalList(params.brandIds),
      normalizeOptionalList(params.modelIds),
      normalizeOptionalList(params.partTypeIds),
      normalizeOptional(params.shopId),
      params.pageNumber,
      params.pageSize,
      params.sortBy,
      params.sortDirection,
    );

    return unwrapResponse<PublicProductListItemDtoPageResponse>(response as PublicProductListItemDtoPageResponseApiResponse);
  },

  async getPublicProducts(params: GetPublicProductsParams): Promise<PublicProductListItemDtoPageResponse> {
    return this.products2(params);
  },

  async getNewArrivalProducts(params?: GetNewArrivalProductsParams): Promise<PublicNewArrivalProductItemDtoPageResponse> {
    const response = await apiClient.newArrivals(
      normalizeOptional(params?.search),
      normalizeOptional(params?.categoryId),
      normalizeOptional(params?.brandId),
      normalizeOptional(params?.modelId),
      normalizeOptional(params?.partTypeId),
      undefined,
      undefined,
      undefined,
      undefined,
      normalizeOptional(params?.shopId),
      params?.pageNumber,
      params?.pageSize,
      params?.sortBy,
      params?.sortDirection,
    );

    return unwrapResponse<PublicNewArrivalProductItemDtoPageResponse>(response as PublicNewArrivalProductItemDtoPageResponseApiResponse);
  },

  async getFeaturedProducts(params: GetFeaturedProductsParams): Promise<PublicNewArrivalProductItemDtoPageResponse> {
    const response = await apiClient.featured(
      params.shopId,
      normalizeOptional(params.search),
      params.pageNumber,
      params.pageSize,
      params.sortBy,
      params.sortDirection,
    );

    return unwrapResponse<PublicNewArrivalProductItemDtoPageResponse>(response as PublicNewArrivalProductItemDtoPageResponseApiResponse);
  },
};
