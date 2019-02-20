import { FILE } from '../constants/action_type';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE.ADD_INIT:
    case FILE.SAVE_INIT:
      return true;
    case FILE.CONVERT_DONE:
    case FILE.CONVERT_FAIL:
    case FILE.ADD_FAIL:
    case FILE.SAVE_DONE:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
