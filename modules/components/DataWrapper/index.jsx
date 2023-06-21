import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { STALE_TIME } from '@/lib/constants';
import listBoolQuestions from '@/modules/question/controllers/listBoolQuestions';
import listScaleQuestions from '@/modules/question/controllers/listScaleQuestions';
import questionsKeys from '@/modules/question/hooks/questionsKeys';

const DataWrapper = ({ children }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetch = async () => {
      queryClient.prefetchQuery(
        questionsKeys.boolKeyList({}),
        (context) => listBoolQuestions(context.queryKey[3]),
        { staleTime: STALE_TIME, cacheTime: STALE_TIME }
      );

      queryClient.prefetchQuery(
        questionsKeys.scaleKeyList({}),
        (context) => listScaleQuestions(context.queryKey[3]),
        { staleTime: STALE_TIME, cacheTime: STALE_TIME }
      );
    };

    prefetch();
  }, []);

  return <>{children}</>;
};

export default DataWrapper;
