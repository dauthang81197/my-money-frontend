import {useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '@/app/hooks/queries/constantQueryKey';
import api from '@/app/hooks/helpers/helper';

export interface TransactionDto {
    startDate: string;
    endDate: string;
}

export interface TransactionPayload {
    categoryId: string;
    amount: number;
    occurredAt: string;
    note?: string;
    merchantId?: string;
    currencyCode?: string;
}

export interface TransactionResponse {
    status: string;
}

export interface QueryTransactionDto {
    searchKey?: string;
}

export interface TransactionHistoryResponse {
    id: string
    type: string
    amount: number
    transactionTime: string
    transactionDate: string
    note: string
    splits: SplitResponse[]
}

export interface SplitResponse {
    id: string
    category: CategoryResponse
}

export interface CategoryResponse {
    id: string
    name: string
}

export interface PaginationCommon<T> {
    count: number;
    currentPage: number;
    data: T[]
    totalPage: number;
}

export const TRANSACTION_URL = 'transaction'
export const useGetTransaction = (dto: TransactionDto) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_TRANSACTION, dto],
        queryFn: () =>
            api(`${TRANSACTION_URL}/expenses`, {
                method: 'GET',
                params: {startDate: dto.startDate, endDate: dto.endDate},
            }),
        retry: false,
    });
};


export const useAddTransaction = () => {
    return useMutation<TransactionResponse, Error, TransactionPayload>({
        mutationKey: [QUERY_KEY.POST_LOGIN],
        mutationFn: async (body) => {
            return api<TransactionResponse>(`${TRANSACTION_URL}/expense`, {
                method: 'POST',
                body: JSON.stringify(body),
            });
        },
    });
};

export const useGetTransactionHistory = (dto: QueryTransactionDto) => {
    return useQuery<PaginationCommon<TransactionHistoryResponse>, Error, QueryTransactionDto>({
        queryKey: [QUERY_KEY.GET_TRANSACTION_HISTORY],
        queryFn: () =>
            api<PaginationCommon<TransactionHistoryResponse>>(`${TRANSACTION_URL}/histories`, {
                method: 'GET',
                params: {startDate: dto.searchKey},
            }),
        retry: false,
    });
};