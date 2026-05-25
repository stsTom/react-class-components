import { create } from 'zustand';
import { fetchData, simulateError } from '../utils/searchEngine';
import type { Item } from './types';

export interface SearchSlice {
  items: Item[];
  pagesCount: number;
  currentPage: number;
  isLoading: boolean;
  errorMessage: string | null;
  findItems: (searchRequest: string, searchPage: number) => Promise<void>;
  goToPage: (searchRequest: string, page: number) => void;
  simulateError: () => void;
}

const initialState = {
  items: [] as Item[],
  pagesCount: 0,
  currentPage: 0,
  isLoading: true,
  errorMessage: null,
};

export const useSearchStore = create<SearchSlice>((set, get) => ({
  ...initialState,

  findItems: async (searchRequest: string, searchPage: number) => {
    set({ isLoading: true, currentPage: searchPage });

    try {
      const data = await fetchData(searchRequest, searchPage);
      set({
        items: data?.movies ?? [],
        pagesCount: data?.pagesCount ?? 0,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({ errorMessage: error.message });
      }
    }
  },

  goToPage: (searchRequest: string, newPage: number) => {
    get().findItems(searchRequest, newPage);
  },

  simulateError: () => {
    try {
      simulateError();
    } catch (error) {
      if (error instanceof Error) {
        set({ errorMessage: error.message });
      }
    }
  },
}));
