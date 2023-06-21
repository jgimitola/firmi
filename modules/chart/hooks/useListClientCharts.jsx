import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL, STALE_TIME } from '@/lib/constants';

import listClientCharts from '../controllers/listClientCharts';

const uselistClientCharts = (params, filters, config) => {
  const query = useQuery(
    {
      queryKey: ['clientCharts', { ...params, ...filters }],
      queryFn: (context) => listClientCharts(context.queryKey[1]),
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

export default uselistClientCharts;
