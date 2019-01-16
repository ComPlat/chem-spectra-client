import { FILE } from '../constants/action_type';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE.ADD:
      return true;
    case FILE.CONVERT_GOOD:
    case FILE.CONVERT_BAD:
    case FILE.ADD_BAD:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
