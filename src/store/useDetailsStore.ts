import { create } from 'zustand';
import { fetchItemData } from '../utils/searchEngine';
import { notFound } from '@tanstack/react-router';
import type { Details } from './types';

export interface DetailsSlice {
  details: Details | null;
  isLoading: boolean;
  errorMessage: string | null;
  fetchDetails: (movieId: string) => Promise<void>;
}

const initialState = {
  details: null as Details | null,
  isLoading: true,
  errorMessage: null,
};

export const useDetailsStore = create<DetailsSlice>((set) => ({
  ...initialState,

  fetchDetails: async (movieId: string) => {
    set({ isLoading: true, errorMessage: null });

    try {
      const movieData = await fetchItemData(movieId);
      if (!movieData) throw notFound();
      set({
        details: {
          title: movieData.movie.title,
          mainDirector: movieData.movie.mainDirector.name,
          usReleaseDate: movieData.movie.usReleaseDate,
        },
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        set({ errorMessage: error.message, isLoading: false });
      }
    }
  },
}));
