import { useQuery } from '@tanstack/react-query';

import getCurrentClient from '../controllers/getCurrentClient';
import clientKeys from './clientKeys';

const useGetCurrentClient = (params, filters, config) => {
  const query = useQuery(clientKeys.currentKey, () => getCurrentClient(), {
    retry: false,
    refetchOnWindowFocus: false,
    ...config,
  });

  return query;
};

export default useGetCurrentClient;
