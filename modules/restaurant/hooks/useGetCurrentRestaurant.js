import { useQuery } from '@tanstack/react-query';

import getCurrentRestaurant from '../controllers/getCurrentRestaurant';
import restaurantKeys from './restaurantKeys';

const useGetCurrentRestaurant = (params, filters, config) => {
  const query = useQuery(
    restaurantKeys.currentKey,
    () => getCurrentRestaurant(),
    {
      retry: false,
      refetchOnWindowFocus: false,
      ...config,
    }
  );

  return query;
};

export default useGetCurrentRestaurant;
