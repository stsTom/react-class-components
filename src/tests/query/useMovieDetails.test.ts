import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import { useMovieDetails } from '../../store';
import { useDetailsStore } from '../../store';
import * as searchEngine from '../../utils/searchEngine';

vi.mock('../../utils/searchEngine', () => ({
  fetchData: vi.fn(),
  fetchItemData: vi.fn(),
  simulateError: vi.fn(),
}));
vi.mock('@tanstack/react-router', () => ({
  notFound: () => Object.assign(new Error('Not found'), { isNotFound: true }),
}));

const fetchItemData = vi.mocked(searchEngine.fetchItemData);

const RAW_RESPONSE = {
  movie: {
    title: 'Inception',
    mainDirector: { name: 'Christopher Nolan' },
    usReleaseDate: '2010-07-16',
  },
};

const MAPPED_DETAILS = {
  title: 'Inception',
  mainDirector: 'Christopher Nolan',
  usReleaseDate: '2010-07-16',
};

function makeQueryClient(staleTime = 0) {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime, gcTime: Infinity } },
  });
}

function makeWrapper(client: QueryClient) {
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client }, children);
}

describe('useMovieDetails', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = makeQueryClient();
    useDetailsStore.setState({ details: null, errorMessage: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('starts loading, then maps the raw API shape into the store on success', async () => {
    fetchItemData.mockResolvedValue(RAW_RESPONSE);

    const { result } = renderHook(
      () => useMovieDetails({ movieId: 'tt1375666' }),
      { wrapper: makeWrapper(queryClient) }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(useDetailsStore.getState().details).toEqual(MAPPED_DETAILS);
    expect(useDetailsStore.getState().errorMessage).toBeNull();
  });

  it('syncs errorMessage into the store on failure', async () => {
    fetchItemData.mockRejectedValue(new Error('Not found'));

    const { result } = renderHook(
      () => useMovieDetails({ movieId: 'tt1375666' }),
      { wrapper: makeWrapper(queryClient) }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(useDetailsStore.getState().errorMessage).toBe('Not found');
  });

  it('serves cached data without a second fetch, then refetches after invalidation', async () => {
    const cachingClient = makeQueryClient(60_000);
    fetchItemData.mockResolvedValue(RAW_RESPONSE);

    const { result } = renderHook(
      () => useMovieDetails({ movieId: 'tt1375666' }),
      { wrapper: makeWrapper(cachingClient) }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchItemData).toHaveBeenCalledTimes(1);

    renderHook(() => useMovieDetails({ movieId: 'tt1375666' }), {
      wrapper: makeWrapper(cachingClient),
    });
    expect(fetchItemData).toHaveBeenCalledTimes(1);

    await cachingClient.invalidateQueries({
      queryKey: ['movies', 'details', 'tt1375666'],
    });
    await waitFor(() => expect(fetchItemData).toHaveBeenCalledTimes(2));

    cachingClient.clear();
  });
});
