import { create } from 'zustand';
import type { Item } from './types';

export interface SearchSlice {
  items: Item[];
  pagesCount: number;
  currentPage: number;
  errorMessage: string | null;
  setResults: (items: Item[], pagesCount: number) => void;
  setPage: (page: number) => void;
  setError: (message: string) => void;
  reset: () => void;
}

const initialState = {
  items: [] as Item[],
  pagesCount: 0,
  currentPage: 0,
  errorMessage: null as string | null,
};

export const useSearchStore = create<SearchSlice>((set) => ({
  ...initialState,

  setResults: (items, pagesCount) =>
    set({ items, pagesCount, errorMessage: null }),

  setPage: (page) => set({ currentPage: page }),

  setError: (message) => set({ errorMessage: message }),

  reset: () => set(initialState),
}));
