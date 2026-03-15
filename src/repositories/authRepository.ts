import { apiClient } from '@/api/client';
import type {
  LoginRequestDto,
  LoginResponseDto,
  LoginResponseDtoApiResponse,
  UserProfileResponseDto,
  UserProfileResponseDtoApiResponse,
} from '@/api/generated/apiClient';

function unwrapResponse<T>(response: { success?: boolean; message?: string; data?: T }): T {
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }

  return response.data;
}

export const authRepository = {
  async login(body: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await apiClient.login(body);
    return unwrapResponse<LoginResponseDto>(response as LoginResponseDtoApiResponse);
  },
  async me(): Promise<UserProfileResponseDto> {
    const response = await apiClient.me();
    return unwrapResponse<UserProfileResponseDto>(response as UserProfileResponseDtoApiResponse);
  },
};
