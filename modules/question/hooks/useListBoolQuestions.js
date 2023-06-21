import { useQuery } from '@tanstack/react-query';

import { REFETCH_INTERVAL, STALE_TIME } from '@/lib/constants';

import listBoolQuestions from '../controllers/listBoolQuestions';
import questionsKeys from './questionsKeys';

const useListBoolQuestions = (params, filters, config) => {
  const query = useQuery(
    questionsKeys.boolKeyList({ ...params, ...filters }),
    (context) => listBoolQuestions(context.queryKey[3]),
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

export default useListBoolQuestions;
