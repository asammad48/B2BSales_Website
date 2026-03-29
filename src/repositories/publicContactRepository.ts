import { apiClient } from '@/api/client';
import type {
  CreateContactInquiryRequestDto,
  CreateContactInquiryResponseDto,
  CreateContactInquiryResponseDtoApiResponse,
} from '@/api/generated/apiClient';

type ApiResponse<T> = { success?: boolean; message?: string; data?: T };

function unwrapResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }

  return response.data;
}

export const publicContactRepository = {
  async createContactInquiry(body: CreateContactInquiryRequestDto): Promise<CreateContactInquiryResponseDto> {
    const response = await apiClient.contact(body);
    return unwrapResponse<CreateContactInquiryResponseDto>(response as CreateContactInquiryResponseDtoApiResponse);
  },
};
