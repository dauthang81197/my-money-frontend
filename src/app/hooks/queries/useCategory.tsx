import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '@/app/hooks/queries/constantQueryKey';
import api from '@/app/hooks/helpers/helper';

export interface MyCategory {
    id: string
    createdAt: string
    updatedAt: string
    userId: string
    name: string
    kind: string
    parentId: string
    icon: string
    isArchived: boolean
}

export const useGetMyCategory = () => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_TRANSACTION],
        queryFn: () =>
            api<MyCategory[]>('categories/my-category', {
                method: 'GET',
            }),
        retry: false,
    });
};
