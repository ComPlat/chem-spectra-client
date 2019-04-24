import {
  FILE, MOL, PREDICT, FORM,
} from '../constants/action_type';

const initialState = false;

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE.ADD_INIT:
    case FILE.SAVE_INIT:
    case MOL.ADD_INIT:
    case PREDICT.PREDICT_INIT:
    case FORM.SUBMIT:
      return true;
    case FILE.ADD_DONE:
    case FILE.ADD_FAIL:
    case FILE.CONVERT_DONE:
    case FILE.CONVERT_FAIL:
    case FILE.SAVE_DONE:
    case MOL.CONVERT_DONE:
    case MOL.CONVERT_FAIL:
    case MOL.ADD_FAIL:
    case PREDICT.PREDICT_DONE:
    case PREDICT.PREDICT_FAIL:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
