import axiosInstance from './axiosInstance';
import type { ApiResponse, PaginatedData, Product } from '@/types';

export interface ProductQuery {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export const productApi = {
  list: async (params: ProductQuery = {}) => {
    const { data } = await axiosInstance.get<ApiResponse<PaginatedData<Product>>>('/products', {
      params: {
        ...params,
        page: params.page?.toString(),
        limit: params.limit?.toString(),
      },
    });
    return data.data;
  },
  getById: async (id: string) => {
    const { data } = await axiosInstance.get<ApiResponse<Product>>(`/products/${id}`);
    return data.data;
  },
  create: async (formData: FormData) => {
    const { data } = await axiosInstance.post<ApiResponse<Product>>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },
  update: async (id: string, formData: FormData) => {
    const { data } = await axiosInstance.patch<ApiResponse<Product>>(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },
  delete: async (id: string) => {
    await axiosInstance.delete(`/products/${id}`);
  },
};
