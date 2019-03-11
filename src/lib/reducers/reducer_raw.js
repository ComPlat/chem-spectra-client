import { RAW, FILE } from '../constants/action_type';

const initialState = {
  scan: 0,
};

const updateRawScan = (state, action) => {
  const { payload } = action;
  const scan = parseInt(payload.scan, 0);
  return Object.assign(
    {},
    state,
    { scan },
  );
};

const rawReducer = (state = initialState, action) => {
  switch (action.type) {
    case RAW.UPDATE_SCAN:
      return updateRawScan(state, action);
    case RAW.INSERT:
    case RAW.CLEAR_SCAN:
    case FILE.CONVERT_DONE:
    case FILE.ADD_FAIL:
    case FILE.CONVERT_FAIL:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export default rawReducer;
