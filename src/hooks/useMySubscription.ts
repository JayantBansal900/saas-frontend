import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API = 'http://localhost:3000/subscriptions';

interface Subscription {
  _id: string;
  /** Plan id, or the full plan when the API populates it */
  planId?: string | { _id: string; name: string };
  status: string;
}

export const useMySubscription = () =>
  useQuery<Subscription[]>({
    queryKey: ['mySubscription'],
    queryFn: async () => {
      const res = await axios.get(API, { withCredentials: true });
      return res.data;
    },
  });

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      axios.patch(`${API}/${id}/cancel`, {}, { withCredentials: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySubscription'] });
    },
  });
};
