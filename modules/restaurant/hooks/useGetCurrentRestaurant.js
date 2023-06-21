import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL, STALE_TIME } from '@/lib/constants';

import getCurrentRestaurant from '../controllers/getCurrentRestaurant';
import restaurantKeys from './restaurantKeys';

const useGetCurrentRestaurant = (params, filters, config) => {
  const query = useQuery(
    restaurantKeys.currentKey,
    () => getCurrentRestaurant(),
    {
      keepPreviousData: true,
      retry: false,
      refetchOnWindowFocus: false,
      refetchInterval: REFETCH_INTERVAL,
      staleTime: STALE_TIME,
      cacheTime: STALE_TIME,
      ...config,
    }
  );

  return query;
};

export default useGetCurrentRestaurant;
