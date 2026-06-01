import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { notFound } from '@tanstack/react-router';
import { fetchItemData } from '../utils/searchEngine';
import { useDetailsStore } from '../store/useDetailsStore';
import { movieKeys } from './queryKeys';
import { queryConfig } from './queryConfig';

interface UseMovieDetailsOptions {
  movieId: string;
  staleTime?: number;
}

export function useMovieDetails({
  movieId,
  staleTime = queryConfig.staleTime,
}: UseMovieDetailsOptions) {
  const setDetails = useDetailsStore((s) => s.setDetails);
  const setError = useDetailsStore((s) => s.setError);

  const query = useQuery({
    queryKey: movieKeys.details(movieId),
    queryFn: async () => {
      const data = await fetchItemData(movieId);
      if (!data) return notFound;
      return data;
    },
    staleTime,
    enabled: Boolean(movieId),
  });

  useEffect(() => {
    if (query.data) {
      setDetails({
        title: query.data.movie.title,
        mainDirector: query.data.movie.mainDirector.name,
        usReleaseDate: query.data.movie.usReleaseDate,
      });
    }
  }, [query.data, setDetails]);

  useEffect(() => {
    if (query.error instanceof Error) {
      setError(query.error.message);
    }
  }, [query.error, setError]);

  return query;
}
