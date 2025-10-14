import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/hooks/queries/constantQueryKey';
import api from '@/app/hooks/helpers/helper';

export interface TransactionDto {
  startDate: string;
  endDate: string;
}

export const useGetTransaction = (dto: TransactionDto) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_TRANSACTION, dto],
    queryFn: () =>
      api('transaction/expenses', {
        method: 'GET',
        params: { startDate: dto.startDate, endDate: dto.endDate },
      }),
    retry: false,
  });
};
