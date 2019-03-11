import { FILE, PREDICT, RAW } from '../constants/action_type';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE.ADD_INIT:
    case FILE.SAVE_INIT:
    case PREDICT.BY_PEAKS_INIT:
      return true;
    case RAW.INSERT:
    case FILE.CONVERT_DONE:
    case FILE.CONVERT_FAIL:
    case FILE.ADD_FAIL:
    case FILE.SAVE_DONE:
    case PREDICT.BY_PEAKS_DONE:
    case PREDICT.BY_PEAKS_FAIL:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
