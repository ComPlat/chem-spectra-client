import {
  PREDICT, FORM, FILE, MOL,
} from '../constants/action_type';

const initialState = {
  result: { result: [] },
};

const updatePredict = (state, action) => {
  const { payload } = action;
  const { result } = payload;
  return Object.assign(
    {},
    state,
    { result },
  );
};

const predictReducer = (state = initialState, action) => {
  switch (action.type) {
    case PREDICT.PREDICT_INIT:
      return Object.assign({}, state, initialState);
    case PREDICT.PREDICT_DONE:
      return Object.assign({}, state, updatePredict(state, action));
    case PREDICT.ADD_PRED_JSON_INIT:
      return Object.assign({}, state, { result: action.payload });
    case FILE.ADD_FAIL:
    case FILE.CONVERT_FAIL:
    case MOL.ADD_FAIL:
    case MOL.CONVERT_DONE:
    case MOL.CONVERT_FAIL:
    case PREDICT.PREDICT_FAIL:
    case FORM.SUBMIT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export default predictReducer;
