import { useMutation } from '@tanstack/react-query';

import logout from '../controllers/logout';

const useLogout = () => {
  const logoutMutation = useMutation({
    mutationFn: logout,
  });

  return logoutMutation;
};

export default useLogout;
