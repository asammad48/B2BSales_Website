import { apiClient } from '@/api/client';
import type {
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
  async placeClientOrder(request: PlaceClientOrderRequestDto): Promise<PlaceClientOrderResponseDto> {
    const response = await apiClient.client(request);
    return unwrapResponse<PlaceClientOrderResponseDto>(response as PlaceClientOrderResponseDtoApiResponse);
  },
};
