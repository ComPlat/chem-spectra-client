import { PREDICT } from '../constants/action_type';

const predictByPeaksInit = payload => (
  {
    type: PREDICT.BY_PEAKS_INIT,
    payload,
  }
);

export { predictByPeaksInit }; // eslint-disable-line
