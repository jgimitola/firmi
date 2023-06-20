import { useMutation } from '@tanstack/react-query';

import login from '../controllers/login';

const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: login,
  });

  return loginMutation;
};

export default useLogin;
