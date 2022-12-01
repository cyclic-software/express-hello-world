import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Router } from './Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1 * 60 * 1000, // 1 min
      cacheTime: 1000 * 60 * 30, // 30 min
      refetchOnWindowFocus: false,
      suspense: false,
    },
    mutations: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    <Router />
  </QueryClientProvider>
);
