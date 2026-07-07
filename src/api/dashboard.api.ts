import axiosInstance from './axiosInstance';
import type { ApiResponse, DashboardStats } from '@/types';

export const dashboardApi = {
  getStats: async () => {
    const { data } = await axiosInstance.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return data.data;
  },
};
