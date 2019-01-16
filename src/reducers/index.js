import { combineReducers } from 'redux';
import fileReducer from './reducer_file';
import noticeReducer from './reducer_notice';
import loadingReducer from './reducer_loading';

const rootReducer = combineReducers({
  file: fileReducer,
  notice: noticeReducer,
  loading: loadingReducer,
});

export default rootReducer;
