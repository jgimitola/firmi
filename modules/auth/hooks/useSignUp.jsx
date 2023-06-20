import { useMutation } from '@tanstack/react-query';

import signup from '../controllers/signup';

const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: signup,
  });

  return mutation;
};

export default useSignUp;
