import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL } from '@/lib/constants';

import listClientCharts from '../controllers/listClientCharts';

const useListClientCharts = (params, filters, config) => {
  const query = useQuery({
    queryKey: ['clientsCharts', { ...params, ...filters }],
    queryFn: (context) => listClientCharts(context.queryKey[1]),
    config: {
      ...config,
      refetchInterval: REFETCH_INTERVAL,
    },
  });

  return query;
};

export default useListClientCharts;
