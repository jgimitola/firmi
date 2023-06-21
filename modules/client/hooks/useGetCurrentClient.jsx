import { useQuery } from '@tanstack/react-query';

import { STALE_TIME } from '@/lib/constants';

import getCurrentClient from '../controllers/getCurrentClient';
import clientKeys from './clientKeys';

const useGetCurrentClient = (params, filters, config) => {
  const query = useQuery(clientKeys.currentKey, () => getCurrentClient(), {
    keepPreviousData: true,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: STALE_TIME,
    cacheTime: STALE_TIME,
    ...config,
  });

  return query;
};

export default useGetCurrentClient;
