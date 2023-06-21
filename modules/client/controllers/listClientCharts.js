import firmiApi from '@/modules/api/firmiApi';

const listClientCharts = async (params, token) => {
  try {
    const { data } = await firmiApi.get('/chart/', {
      params: { ...params, userType: 'CLIENT' },
      headers: { Authorization: Boolean(token) && `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default listClientCharts;
