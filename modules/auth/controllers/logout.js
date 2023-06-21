import firmiApi from '@/modules/api/firmiApi';

const logout = async () => {
  try {
    const { data } = await firmiApi.delete('/auth/logout');

    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default logout;
