import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL, STALE_TIME } from '@/lib/constants';

import listScaleQuestions from '../controllers/listScaleQuestions';
import questionsKeys from './questionsKeys';

const useListScaleQuestions = (params, filters, config) => {
  const query = useQuery(
    questionsKeys.scaleKeyList({ ...params, ...filters }),
    (context) => listScaleQuestions(context.queryKey[3]),
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

export default useListScaleQuestions;
