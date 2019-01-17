import { FILE } from '../constants/action_type';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE.ADD:
    case FILE.SAVE:
      return true;
    case FILE.CONVERT_GOOD:
    case FILE.CONVERT_BAD:
    case FILE.ADD_BAD:
    case FILE.SAVE_DONE:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
