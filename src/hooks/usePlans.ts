import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API = 'http://localhost:3000/plans';

interface Plan {
  _id: string;
  name: string;
  price: number;
}

export const useFetchPlans = () =>
  useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: async () => {
      const res = await axios.get(API, { withCredentials: true });
      return res.data;
    },
  });

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPlan: { name: string; price: string }) =>
      axios.post(API, newPlan, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      axios.patch(`${API}/${id}`, data, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${API}/${id}`, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    },
  });
};

export const useSubscribeToPlan = () => {
  return useMutation({
    mutationFn: (planId: string) =>
      axios.post(
        'http://localhost:3000/subscriptions',
        { planId },
        { withCredentials: true }
      ),
  });
};
