import { create } from 'zustand';

export interface Plan {
  _id: string;
  name: string;
  price: number;
}

interface PlanState {
  plans: Plan[];
  setPlans: (data: Plan[]) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  plans: [],
  setPlans: (data) => set({ plans: data }),
}));