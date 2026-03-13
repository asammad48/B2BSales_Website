import { env } from '@/env';
import { http } from './http';
import { ApiClient } from './generated/apiClient';

export const apiClient = new ApiClient(env.apiBaseUrl, http);
