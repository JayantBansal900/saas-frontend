// src/hooks/useUserSubscription.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export const useUserSubscription = () => useQuery({
    queryKey: ['userSubscription'],
    queryFn: async () => {
        const res = await axios.get('http://localhost:3000/subscriptions', {
            withCredentials: true,
        });
        return res.data;
    },
});
