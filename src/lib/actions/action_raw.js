import { RAW } from '../constants/action_type';

const updateRawScan = payload => (
  {
    type: RAW.UPDATE_SCAN,
    payload,
  }
);

const clearRawScan = payload => (
  {
    type: RAW.CLEAR_SCAN,
    payload,
  }
);

const submitRaw = payload => (
  {
    type: RAW.SUBMIT,
    payload,
  }
);

export { updateRawScan, clearRawScan, submitRaw };
