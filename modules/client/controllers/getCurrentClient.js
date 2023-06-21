const { default: firmiApi } = require('@/modules/api/firmiApi');

const getCurrentClient = async () => {
  try {
    const { data } = await firmiApi.get('/user');

    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default getCurrentClient;
