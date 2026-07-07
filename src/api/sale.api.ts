import axiosInstance from './axiosInstance';
import type { ApiResponse, PaginatedData, Sale } from '@/types';

export interface SaleQuery {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
}

export interface CreateSaleInput {
  items: { productId: string; quantity: number }[];
}

export const saleApi = {
  list: async (params: SaleQuery = {}) => {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedData<Sale>>>('/sales', {
      params: {
        ...params,
        page: params.page?.toString(),
        limit: params.limit?.toString(),
      },
    });
    return data.data;
  },
  getById: async (id: string) => {
    const { data } = await axiosInstance.get<ApiResponse<Sale>>(`/sales/${id}`);
    return data.data;
  },
  create: async (input: CreateSaleInput) => {
    const { data } = await axiosInstance.post<ApiResponse<Sale>>('/sales', input);
    return data.data;
  },
};
