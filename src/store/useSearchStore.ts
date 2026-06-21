import { create } from 'zustand';
import type { Item } from './types';

export interface SearchSlice {
  items: Item[];
  pagesCount: number;
  currentPage: number;
  errorMessage: string | null;
  isFetching: boolean;
  setResults: (items: Item[], pagesCount: number) => void;
  setPage: (page: number) => void;
  setError: (message: string) => void;
  setFetching: (isFetching: boolean) => void;
  reset: () => void;
}

const initialState = {
  items: [] as Item[],
  pagesCount: 0,
  currentPage: 0,
  errorMessage: null as string | null,
  isFetching: false,
};

export const useSearchStore = create<SearchSlice>((set) => ({
  ...initialState,

  setResults: (items, pagesCount) =>
    set({ items, pagesCount, errorMessage: null }),

  setPage: (page) => set({ currentPage: page }),

  setError: (message) => set({ errorMessage: message }),

  setFetching: (isFetching) => set({ isFetching }),

  reset: () => set(initialState),
}));