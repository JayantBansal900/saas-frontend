import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const API = 'http://localhost:3000/plans';
export const useFetchPlans = () => useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
        const res = await axios.get(API, { withCredentials: true });
        return res.data;
    },
});
export const useCreatePlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPlan) => axios.post(API, newPlan, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
        },
    });
};
export const useUpdatePlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => axios.patch(`${API}/${id}`, data, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
        },
    });
};
export const useDeletePlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.delete(`${API}/${id}`, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
        },
    });
};
export const useSubscribeToPlan = () => {
    return useMutation({
        mutationFn: (planId) => axios.post('http://localhost:3000/subscriptions', { planId }, { withCredentials: true }),
    });
};
