"use client"

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchData } from '../utils/searchEngine';
import { useSearchStore } from '../store/useSearchStore';
import { movieKeys } from './queryKeys';
import { queryConfig } from './queryConfig';

interface UseMovieSearchOptions {
  search: string;
  page: number;
  staleTime?: number;
  enabled?: boolean;
}

export function useMovieSearch({
  search,
  page,
  staleTime = queryConfig.staleTime,
  enabled = true,
}: UseMovieSearchOptions) {
  const setResults = useSearchStore((s) => s.setResults);
  const setPage = useSearchStore((s) => s.setPage);
  const setError = useSearchStore((s) => s.setError);

  const query = useQuery({
    queryKey: movieKeys.movieInfo(search, page),
    queryFn: () => fetchData(search, page),
    staleTime,
    placeholderData: (prev) => prev,
    enabled,
  });

  useEffect(() => {
    if (query.data) {
      setResults(query.data.movies ?? [], query.data.pagesCount ?? 0);
      setPage(page);
    }
  }, [query.data, page, setResults, setPage]);

  useEffect(() => {
    if (query.error instanceof Error) {
      setError(query.error.message);
    }
  }, [query.error, setError]);

  return query;
}
