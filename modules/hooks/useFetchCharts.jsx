import { useQuery } from '@tanstack/react-query';

import listCharts from '../controllers/fetchCharts';

const useHelloWorld = (params = {}) => {
  const info = useQuery({
    queryKey: ['charts', { ...params }],
    queryFn: (context) => listCities(context.queryKey[1]),
    initialData: { data: { result: [] } },
  });

  return info;
};

export default useHelloWorld;
