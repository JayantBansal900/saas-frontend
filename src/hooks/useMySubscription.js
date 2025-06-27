import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const API = 'http://localhost:3000/subscriptions';
export const useMySubscription = () => useQuery({
    queryKey: ['mySubscription'],
    queryFn: async () => {
        const res = await axios.get(API, { withCredentials: true });
        return res.data;
    },
});
export const useCancelSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.patch(`${API}/${id}/cancel`, {}, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mySubscription'] });
        },
    });
};
