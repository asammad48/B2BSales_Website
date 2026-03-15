import { apiClient } from '@/api/client';
import type {
  ClientLoginRequestDto,
  ClientLoginResponseDto,
  ClientLoginResponseDtoApiResponse,
} from '@/api/generated/apiClient';

type ApiResponse<T> = { success?: boolean; message?: string; data?: T };

function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }

  return response.data;
}

export const clientAuthRepository = {
  async clientLogin(body: ClientLoginRequestDto): Promise<ClientLoginResponseDto> {
    const response = await apiClient.login2(body);
    return unwrapResponse<ClientLoginResponseDto>(response as ClientLoginResponseDtoApiResponse);
  },
};

