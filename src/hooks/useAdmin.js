import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export const useAdminUsers = () => {
    return useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/admin/users', {
                withCredentials: true,
            });
            return res.data;
        },
    });
};
export const useAdminPlans = () => {
    return useQuery({
        queryKey: ['admin-plans'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/admin/plans', {
                withCredentials: true,
            });
            return res.data;
        },
    });
};
