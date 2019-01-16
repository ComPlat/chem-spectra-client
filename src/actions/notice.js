import { NOTICE } from '../constants/action_type';

const initNotice = payload => (
  {
    type: NOTICE.INIT,
    payload,
  }
);

export { initNotice }; // eslint-disable-line
