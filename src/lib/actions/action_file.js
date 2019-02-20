import { FILE } from '../constants/action_type';

const addFileInit = payload => (
  {
    type: FILE.ADD_INIT,
    payload,
  }
);

const convertFileInit = payload => (
  {
    type: FILE.CONVERT_INIT,
    payload,
  }
);

const saveFileInit = payload => (
  {
    type: FILE.SAVE_INIT,
    payload,
  }
);

export { addFileInit, convertFileInit, saveFileInit };
