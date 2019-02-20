import { FILE } from '../constants/action_type';

const initialState = {
  src: false,
  jcamp: false,
  img: false,
};

const updateConversion = (state, action) => {
  const { payload } = action;
  const { file, jcamp, img } = payload;
  return Object.assign(
    {},
    state,
    {
      src: file,
      jcamp,
      img,
    },
  );
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE.CONVERT_DONE:
      return updateConversion(state, action);
    case FILE.ADD_FAIL:
    case FILE.CONVERT_FAIL:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export default fileReducer;
