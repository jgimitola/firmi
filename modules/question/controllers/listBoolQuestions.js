import firmiApi from '@/modules/api/firmiApi';

const listBoolQuestions = async (params, token) => {
  try {
    const { data } = await firmiApi.get('/question/', {
      params: { ...params, questionType: 'BOOL' },
      headers: { Authorization: Boolean(token) && `Bearer ${token}` },
    });

    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default listBoolQuestions;
