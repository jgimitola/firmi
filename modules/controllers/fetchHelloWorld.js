import firmiApi from '@/modules/api/firmiApi';

const getImages = async ({ queryKey }) => {
  const [_key] = queryKey;

  return await firmiApi.get('/hello');
};

export default getImages;
