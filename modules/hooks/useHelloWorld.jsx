import { useQuery } from '@tanstack/react-query';

import fetchHelloWorld from '../controllers/fetchHelloWorld';

const useHelloWorld = () => {
  const info = useQuery({
    queryKey: ['hello-world'],
    queryFn: fetchHelloWorld,
    initialData: { data: { result: [] } },
  });

  return info;
};

export default useHelloWorld;
