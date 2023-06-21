import firmiApi from '@/modules/api/firmiApi';

const listScaleQuestions = async (params, token) => {
  try {
    const { data } = await firmiApi.get('/question/', {
      params: { ...params, questionType: 'SCALE' },
      headers: { Authorization: Boolean(token) && `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default listScaleQuestions;
