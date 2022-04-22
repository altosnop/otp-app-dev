export const setFile = (file) => (dispatch) =>
  dispatch({
    type: 'SET_FILE',
    payload: file,
  });

export const setFileName = (fileName) => (dispatch) =>
  dispatch({
    type: 'SET_FILE_NAME',
    payload: fileName,
  });
