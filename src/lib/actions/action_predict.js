import { PREDICT } from '../constants/action_type';

const predictInit = payload => (
  {
    type: PREDICT.PREDICT_INIT,
    payload,
  }
);

export {
  predictInit, // eslint-disable-line
};
