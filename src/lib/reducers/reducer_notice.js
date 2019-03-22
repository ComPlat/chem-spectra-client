import {
  NOTICE, FILE, MOL, PREDICT,
} from '../constants/action_type';

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
  message: 'Invalid File: accept only [.dx, .jdx, .JCAMP, .RAW, .mzML], [<10MB]',
};

const errMolState = {
  status: 'error',
  message: 'Invalid File: accept only [.mol], [<10MB]',
};

const sucPredictState = {
  status: 'success',
  message: 'Predict success!',
};

const errPredictState = {
  status: 'error',
  message: 'Predict error!',
};

const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE.ADD_FAIL:
      return Object.assign({}, state, errFileState);
    case MOL.ADD_FAIL:
      return Object.assign({}, state, errMolState);
    case FILE.CONVERT_DONE:
    case MOL.CONVERT_DONE:
      return Object.assign({}, state, sucConversionState);
    case FILE.CONVERT_FAIL:
    case MOL.CONVERT_FAIL:
      return Object.assign({}, state, errConversionState);
    case PREDICT.BY_PEAKS_DONE:
      return Object.assign({}, state, sucPredictState);
    case PREDICT.BY_PEAKS_FAIL:
      return Object.assign({}, state, errPredictState);
    case NOTICE.MANUAL_CLEAR:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export default noticeReducer;
