import { useQuery } from '@tanstack/react-query';

import listRestaurantCharts from '../controllers/listRestaurantCharts';

const useListRestaurantCharts = (params, filters, config) => {
  const query = useQuery(
    {
      queryKey: ['restaurantCharts', { ...params, ...filters }],
      queryFn: (context) => listRestaurantCharts(context.queryKey[1]),
      config: { ...config },
    },
    {
      enabled: !!params,
    }
  );

  return query;
};

export default useListRestaurantCharts;
