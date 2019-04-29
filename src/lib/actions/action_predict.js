import { PREDICT } from '../constants/action_type';

const predictInit = payload => (
  {
    type: PREDICT.PREDICT_INIT,
    payload,
  }
);

const addPredJsonInit = payload => (
  {
    type: PREDICT.ADD_PRED_JSON_INIT,
    payload,
  }
);

export {
  predictInit, addPredJsonInit, // eslint-disable-line
};
