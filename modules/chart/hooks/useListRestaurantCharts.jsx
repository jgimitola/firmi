import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL, STALE_TIME } from '@/lib/constants';

import listRestaurantCharts from '../controllers/listRestaurantCharts';

const uselistRestaurantCharts = (params, filters, config) => {
  const query = useQuery(
    {
      queryKey: ['restaurantCharts', { ...params, ...filters }],
      queryFn: (context) => listRestaurantCharts(context.queryKey[1]),
      initialData: { data: { result: [] } },
      config: {
        ...config,
        refetchInterval: REFETCH_INTERVAL,
        staleTime: STALE_TIME,
      },
    },
    {
      enabled: !!params,
    }
  );

  return query;
};

export default uselistRestaurantCharts;
