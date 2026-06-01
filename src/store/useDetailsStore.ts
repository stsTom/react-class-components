import { create } from 'zustand';
import type { Details } from './types';

export interface DetailsSlice {
  details: Details | null;
  errorMessage: string | null;
  setDetails: (details: Details) => void;
  setError: (message: string) => void;
  reset: () => void;
}

const initialState = {
  details: null as Details | null,
  errorMessage: null as string | null,
};

export const useDetailsStore = create<DetailsSlice>((set) => ({
  ...initialState,

  setDetails: (details) => set({ details, errorMessage: null }),

  setError: (message) => set({ errorMessage: message }),

  reset: () => set(initialState),
}));
