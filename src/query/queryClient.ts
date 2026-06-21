import { QueryClient } from '@tanstack/react-query';
import { queryConfig } from './queryConfig';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: queryConfig.staleTime,
      gcTime: queryConfig.gcTime,
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      retry: 1,
    },
  },
});
