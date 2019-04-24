import { PREDICT, FORM } from '../constants/action_type';

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
    case PREDICT.PREDICT_FAIL:
    case FORM.SUBMIT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export default predictReducer;
