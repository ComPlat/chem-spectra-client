import { FILE } from '../constants/action_type';

const addFile = payload => (
  {
    type: FILE.ADD,
    payload,
  }
);

const convertFile = payload => (
  {
    type: FILE.CONVERT,
    payload,
  }
);

const saveFile = payload => (
  {
    type: FILE.SAVE,
    payload,
  }
);

export { addFile, convertFile, saveFile };