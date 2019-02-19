import { PREDICT } from '../constants/action_type';

const initialState = {
  result: false,
};

const updatePredictByPeaks = (state, action) => {
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
    case PREDICT.BY_PEAKS_INIT:
      return Object.assign({}, state, initialState);
    case PREDICT.BY_PEAKS_DONE:
      return Object.assign({}, state, updatePredictByPeaks(state, action));
    case PREDICT.BY_PEAKS_FAIL:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export default predictReducer;
