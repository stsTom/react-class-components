import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useMovieSearch } from '../../store';
import { useSearchStore } from '../../store';
import * as searchEngine from '../../utils/searchEngine';

vi.mock('../../utils/searchEngine', () => ({
  fetchData: vi.fn(),
  fetchItemData: vi.fn(),
  simulateError: vi.fn(),
}));

const fetchData = vi.mocked(searchEngine.fetchData);

const MOVIES = [
  { id: '1', title: 'Inception', details: '2010-07-16' },
  { id: '2', title: 'Interstellar', details: '2014-11-05' },
];

function makeQueryClient(staleTime = 0) {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime, gcTime: Infinity } },
  });
}

function makeWrapper(client: QueryClient) {
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client }, children);
}

describe('useMovieSearch', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = makeQueryClient();
    useSearchStore.setState({
      items: [],
      pagesCount: 0,
      currentPage: 0,
      errorMessage: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('starts loading, then syncs results into the store on success', async () => {
    fetchData.mockResolvedValue({ movies: MOVIES, pagesCount: 3 });

    const { result } = renderHook(
      () => useMovieSearch({ search: 'inception', page: 0 }),
      { wrapper: makeWrapper(queryClient) }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(useSearchStore.getState().items).toEqual(MOVIES);
    expect(useSearchStore.getState().pagesCount).toBe(3);
    expect(useSearchStore.getState().errorMessage).toBeNull();
  });

  it('syncs errorMessage into the store on failure', async () => {
    fetchData.mockRejectedValue(new Error('Service unavailable'));

    const { result } = renderHook(
      () => useMovieSearch({ search: 'inception', page: 0 }),
      { wrapper: makeWrapper(queryClient) }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(useSearchStore.getState().errorMessage).toBe('Service unavailable');
  });

  it('serves cached data without a second fetch, then refetches after invalidation', async () => {
    const cachingClient = makeQueryClient(60_000);
    fetchData.mockResolvedValue({ movies: MOVIES, pagesCount: 3 });

    const { result } = renderHook(
      () => useMovieSearch({ search: 'inception', page: 0 }),
      { wrapper: makeWrapper(cachingClient) }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchData).toHaveBeenCalledTimes(1);

    renderHook(() => useMovieSearch({ search: 'inception', page: 0 }), {
      wrapper: makeWrapper(cachingClient),
    });
    expect(fetchData).toHaveBeenCalledTimes(1);

    await cachingClient.invalidateQueries({
      queryKey: ['movies', 'movieInfo', { search: 'inception', page: 0 }],
    });
    await waitFor(() => expect(fetchData).toHaveBeenCalledTimes(2));

    cachingClient.clear();
  });
});
