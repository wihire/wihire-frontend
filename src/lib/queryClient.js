import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
      onError: (error) => {
        toast.error(error.message);
      }
    },
    mutations: {
      onError: (error) => {
        toast.error(error.message);
      }
    }
  }
};

const queryClient = new QueryClient(queryClientConfig);

export const getQueryClient = cache(() => queryClient);
