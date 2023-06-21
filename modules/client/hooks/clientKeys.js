const clientKeys = {
  key: ['clients'],
  keyList: () => [...clientKeys.key, 'list'],
  list: (params) => [...clientKeys.keyList(), { ...params }],

  currentKey: ['clients', 'current'],
};

export default clientKeys;
