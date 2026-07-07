import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { saleApi } from '@/api/sale.api';

export const useSales = (params: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['sales', params],
    queryFn: () => saleApi.list(params),
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saleApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};
