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
    id?: string;
}

export interface TransactionResponse {
    status: string;
}

export interface QueryTransactionDto {
    searchKey?: string;
    date?: string;
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
    count?: number;
    currentPage?: number;
    data?: T[]
    totalPage?: number;
}

export interface DetailTransaction {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    accountId: string;
    counterAccountId: string;
    type: string;
    amount: number;
    currencyCode: string;
    transactionTime: string;
    transactionDate: string;
    note: string;
    merchantId: string;
    splits: Split[]
}

export interface Split {
    id: string;
    createdAt: string;
    updatedAt: string;
    txnId: string;
    categoryId: string;
    amount: number;
    category: Category
}

export interface Category {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    name: string;
    kind: string;
    parentId: string;
    icon: string;
    isArchived: boolean;
}

export interface CategoryTransaction {
    categoryId: string
    categoryName: string
    totalAmount: string
}

export interface DashboardResponse {
    summary: Summary
}

export interface Summary {
    today: number
    total: number
    balance: number
    todayChange: number
    totalChange: number
    balanceChange: number
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
        mutationKey: [QUERY_KEY.POST_TRANSACTION],
        mutationFn: async (body) => {
            return api<TransactionResponse>(`${TRANSACTION_URL}/expense`, {
                method: 'POST',
                body: JSON.stringify(body),
            });
        },
    });
};

export const useEditTransaction = () => {
    return useMutation<TransactionResponse, Error, TransactionPayload>({
        mutationKey: [QUERY_KEY.PUT_TRANSACTION],
        mutationFn: async (body) => {
            return api<TransactionResponse>(`${TRANSACTION_URL}/${body?.id}/expense`, {
                method: 'PUT',
                body: JSON.stringify(body),
            });
        },
    });
};

export const useGetDetailTransaction = (id?: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_TRANSACTION, id],
        queryFn: async () =>
            api<DetailTransaction>(`${TRANSACTION_URL}/${id}/expense`, {
                method: 'GET',
            }),
        enabled: !!id, // chỉ gọi API khi có id
        retry: false,
    });
};

export const useDeleteTransaction = () => {
    return useMutation<void, Error, string>({
        mutationKey: [QUERY_KEY.DELETE_TRANSACTION],
        mutationFn: async (id: string) => {
            return api(`${TRANSACTION_URL}/${id}/expense`, {
                method: 'DELETE',
            });
        },
    });
};


export const useGetTransactionHistory = (dto: QueryTransactionDto) => {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_TRANSACTION_HISTORY, dto],
        queryFn: () =>
            api<PaginationCommon<TransactionHistoryResponse>>(
                `${TRANSACTION_URL}/histories`,
                {
                    method: "GET",
                    params: {date: dto?.date},
                }
            ),
        retry: false,
    });

    return {
        ...query,
        isLoading: query.isLoading,
        isFetching: query.isFetching, // nếu cần loading khi refetch
    };
};
export const useGetCategoriesForTransaction = (dto: TransactionDto) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_CATEGORIES, dto],
        queryFn: () =>
            api<CategoryTransaction[]>(`${TRANSACTION_URL}/categories`, {
                method: 'GET',
                params: {startDate: dto.startDate, endDate: dto.endDate},
            }),
        retry: false,
    });
};

export const useGetDashboard = (dto: TransactionDto) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_DASHBOARD, dto],
        queryFn: () =>
            api<DashboardResponse>(`${TRANSACTION_URL}/dashboard`, {
                method: 'GET',
                params: {startDate: dto.startDate, endDate: dto.endDate},
            }),
        retry: false,
    });
};
