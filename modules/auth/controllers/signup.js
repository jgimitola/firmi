import firmiApi from '@/modules/api/firmiApi';

const signup = async (information) => {
  try {
    const { data } = await firmiApi.post('/auth/signup', information);

    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default signup;
