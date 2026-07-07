import axiosInstance from './axiosInstance';
import type { ApiResponse, User } from '@/types';

interface LoginResponse {
  user: User;
  accessToken: string;
}

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', { email, password });
    return data.data;
  },
  getMe: async () => {
    const { data } = await axiosInstance.get<ApiResponse<User>>('/auth/me');
    return data.data;
  },
};
