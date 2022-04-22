import { combineReducers } from 'redux';
import file from './file/fileReducer';

const rootReducer = combineReducers({
  file,
});

export default rootReducer;
