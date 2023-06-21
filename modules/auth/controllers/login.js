import firmiApi from '@/modules/api/firmiApi';

const login = async (credentials) => {
  try {
    const { data } = await firmiApi.post('/auth/login', credentials);

    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default login;
