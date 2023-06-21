import firmiApi from '@/modules/api/firmiApi';

const answerChart = async (information) => {
  try {
    const { data } = await firmiApi.post('/chart', information);
    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default answerChart;
