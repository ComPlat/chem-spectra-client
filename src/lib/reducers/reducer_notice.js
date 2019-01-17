import { NOTICE, FILE } from '../constants/action_type';

const initialState = {
  status: false,
  message: false,
};

const sucConversionState = {
  status: 'success',
  message: 'Conversion success!',
};

const errConversionState = {
  status: 'error',
  message: 'Conversion error!',
};

const errFileState = {
  status: 'error',
  message: 'Invalid File: accept only [.dx or .jdx], [<10MB]',
};

const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE.ADD_BAD:
      return Object.assign({}, state, errFileState);
    case FILE.CONVERT_GOOD:
      return Object.assign({}, state, sucConversionState);
    case FILE.CONVERT_BAD:
      return Object.assign({}, state, errConversionState);
    case NOTICE.MANUAL_CLEAR:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export default noticeReducer;
