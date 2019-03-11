import { combineReducers } from 'redux';
import fileReducer from './reducer_file';
import noticeReducer from './reducer_notice';
import loadingReducer from './reducer_loading';
import predictReducer from './reducer_predict';
import rawReducer from './reducer_raw';

const rootReducer = combineReducers({
  file: fileReducer,
  notice: noticeReducer,
  loading: loadingReducer,
  predict: predictReducer,
  raw: rawReducer,
});

export default rootReducer;
