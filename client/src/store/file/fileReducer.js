const initialStore = {
  file: {},
  fileName: '',
};

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case 'SET_FILE':
      return {
        ...store,
        file: {
          code: action.payload.code,
          expireAt: action.payload.expireAt,
          description: action.payload.description,
        },
      };
    case 'SET_FILE_NAME':
      return {
        ...store,
        fileName: action.payload,
      };
    default:
      return store;
  }
};

export default reducer;
