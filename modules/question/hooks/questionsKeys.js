const questionsKeys = {
  boolKey: ['questions', 'bool'],
  boolKeyList: () => [...questionsKeys.boolKey, 'list'],
  boolList: (params) => [...questionsKeys.boolKeyList(), { ...params }],

  scaleKey: ['questions', 'scale'],
  scaleKeyList: () => [...questionsKeys.scaleKey, 'list'],
  scaleList: (params) => [...questionsKeys.scaleKeyList(), { ...params }],
};

export default questionsKeys;
