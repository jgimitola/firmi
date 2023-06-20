import firmiApi from '@/modules/api/firmiApi';

const listCharts = async (params, token) => {
  try {
    const { data } = await firmiApi.get('/chart', {
      params: { ...params },
      headers: { Authorization: Boolean(token) && `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export default listCharts;
