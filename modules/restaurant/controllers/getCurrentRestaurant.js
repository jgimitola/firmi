const { default: firmiApi } = require('@/modules/api/firmiApi');

const getCurrentRestaurant = async () => {
  try {
    const { data } = await firmiApi.get('/restaurant');

    return data;
  } catch (error) {
    throw error.response?.data;
  }
};

export default getCurrentRestaurant;
