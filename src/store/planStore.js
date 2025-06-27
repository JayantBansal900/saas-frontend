import { create } from 'zustand';
export const usePlanStore = create((set) => ({
    plans: [],
    setPlans: (data) => set({ plans: data }),
}));
