import { FORM, FILE } from '../constants/action_type';

const initialState = {
  scan: 0,
};

const updateFormScan = (state, action) => {
  const { payload } = action;
  const scan = parseInt(payload.scan, 0);
  return Object.assign(
    {},
    state,
    { scan },
  );
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM.UPDATE_SCAN:
      return updateFormScan(state, action);
    case FORM.CLEAR_SCAN:
    case FILE.ADD_INIT:
    case FILE.ADD_FAIL:
    case FILE.ADD_DONE:
    case FILE.CONVERT_DONE:
    case FILE.CONVERT_FAIL:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export default formReducer;
