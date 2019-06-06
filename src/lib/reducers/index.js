import { combineReducers } from 'redux';

import fileReducer from './reducer_file';
import molReducer from './reducer_mol';
import noticeReducer from './reducer_notice';
import loadingReducer from './reducer_loading';
import predictReducer from './reducer_predict';
import formReducer from './reducer_form';
import descReducer from './reducer_desc';

const rootReducer = combineReducers({
  file: fileReducer,
  mol: molReducer,
  notice: noticeReducer,
  loading: loadingReducer,
  predict: predictReducer,
  form: formReducer,
  desc: descReducer,
});

export default rootReducer;
