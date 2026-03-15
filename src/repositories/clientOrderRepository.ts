import { apiClient } from '@/api/client';
import type {
  ClientOrderListItemDtoPageResponse,
  ClientOrderListItemDtoPageResponseApiResponse,
  PlaceClientOrderRequestDto,
  PlaceClientOrderResponseDto,
  PlaceClientOrderResponseDtoApiResponse,
} from '@/api/generated/apiClient';

type ApiResponse<T> = { success?: boolean; message?: string; data?: T };

function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }

  return response.data;
}

export const clientOrderRepository = {
  async getClientOrders(
    clientId: string,
    params?: { pageNumber?: number; pageSize?: number; search?: string; sortBy?: string; sortDirection?: string },
  ): Promise<ClientOrderListItemDtoPageResponse> {
    const response = await apiClient.orders(
      clientId,
      params?.pageNumber,
      params?.pageSize,
      params?.search,
      params?.sortBy,
      params?.sortDirection,
    );

    return unwrapResponse<ClientOrderListItemDtoPageResponse>(response as ClientOrderListItemDtoPageResponseApiResponse);
  },

  async placeClientOrder(request: PlaceClientOrderRequestDto): Promise<PlaceClientOrderResponseDto> {
    const response = await apiClient.client(request);
    return unwrapResponse<PlaceClientOrderResponseDto>(response as PlaceClientOrderResponseDtoApiResponse);
  },
};
