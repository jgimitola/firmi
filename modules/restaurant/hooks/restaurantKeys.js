const restaurantKeys = {
  key: ['restaurants'],
  keyList: () => [...restaurantKeys.key, 'list'],
  list: (params) => [...restaurantKeys.keyList(), { ...params }],

  currentKey: ['restaurants', 'current'],
};

export default restaurantKeys;
