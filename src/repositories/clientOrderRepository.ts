import { apiClient } from '@/api/client';
import type {
  ClientOrderListItemDtoPageResponse,
  ClientOrderListItemDtoPageResponseApiResponse,
  ClientOrderSummaryDto,
  ClientOrderSummaryDtoApiResponse,
  PlaceClientOrderRequestDto,
  PlaceClientOrderResponseDto,
  PlaceClientOrderResponseDtoApiResponse,
} from '@/api/generated/apiClient';

type ApiResponse<T> = { success?: boolean; message?: string; data?: T };

const inFlightRequests = new Map<string, Promise<unknown>>();

function buildOrdersRequestKey(
  clientId: string,
  params?: { pageNumber?: number; pageSize?: number; search?: string; sortBy?: string; sortDirection?: string },
) {
  return `orders:${clientId}:${params?.pageNumber ?? ''}:${params?.pageSize ?? ''}:${params?.search ?? ''}:${params?.sortBy ?? ''}:${params?.sortDirection ?? ''}`;
}

function withInFlightDedup<T>(key: string, requestFactory: () => Promise<T>): Promise<T> {
  const inFlight = inFlightRequests.get(key) as Promise<T> | undefined;
  if (inFlight) {
    return inFlight;
  }

  const request = requestFactory().finally(() => {
    inFlightRequests.delete(key);
  });

  inFlightRequests.set(key, request);
  return request;
}

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
    return withInFlightDedup(buildOrdersRequestKey(clientId, params), async () => {
      const response = await apiClient.orders(
        clientId,
        params?.pageNumber,
        params?.pageSize,
        params?.search,
        params?.sortBy,
        params?.sortDirection,
      );

      return unwrapResponse<ClientOrderListItemDtoPageResponse>(response as ClientOrderListItemDtoPageResponseApiResponse);
    });
  },

  async placeClientOrder(request: PlaceClientOrderRequestDto): Promise<PlaceClientOrderResponseDto> {
    const response = await apiClient.client(request);
    return unwrapResponse<PlaceClientOrderResponseDto>(response as PlaceClientOrderResponseDtoApiResponse);
  },

  async getClientOrderSummary(clientId: string): Promise<ClientOrderSummaryDto> {
    return withInFlightDedup(`summary:${clientId}`, async () => {
      const response = await apiClient.summary(clientId);
      return unwrapResponse<ClientOrderSummaryDto>(response as ClientOrderSummaryDtoApiResponse);
    });
  },
};
