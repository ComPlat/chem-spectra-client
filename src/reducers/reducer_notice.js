import { NOTICE } from '../constants/action_type';

const initialState = {
  ref: false,
};

const initNotice = (state, action) => {
  const { ref } = action.payload;
  return Object.assign({}, state, { ref });
};

const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTICE.INIT:
      return initNotice(state, action);
    default:
      return state;
  }
};

export default noticeReducer;
