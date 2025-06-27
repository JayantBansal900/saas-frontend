import { create } from 'zustand';

export const usePlanStore = create((set) => ({
  plans: [],
  setPlans: (data: any[]) => set({ plans: data }),
}));