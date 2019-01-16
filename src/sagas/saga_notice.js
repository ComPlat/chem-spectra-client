import { takeEvery, select } from 'redux-saga/effects';

import { FILE } from '../constants/action_type';

const getNoticeRef = state => state.notice.ref;

function* noticeBadFile() {
  const txt = 'Invalid File: accept only [.dx or .jdx], [<10MB]';

  const msg = {
    title: 'Error',
    message: txt,
    level: 'error',
    autoDismiss: 5,
    position: 'br',
  };

  const ref = yield select(getNoticeRef);
  const nt = ref.current;
  nt.addNotification(msg);
}

function* noticeGoodConvert() {
  const txt = 'Conversion success!';

  const msg = {
    title: 'Success',
    message: txt,
    level: 'success',
    autoDismiss: 5,
    position: 'br',
  };

  const ref = yield select(getNoticeRef);
  const nt = ref.current;
  nt.addNotification(msg);
}

function* noticeBadConvert() {
  const txt = 'Conversion error!';

  const msg = {
    title: 'Error',
    message: txt,
    level: 'error',
    autoDismiss: 5,
    position: 'br',
  };

  const ref = yield select(getNoticeRef);
  const nt = ref.current;
  nt.addNotification(msg);
}

const noticeSagas = [
  takeEvery(FILE.ADD_BAD, noticeBadFile),
  takeEvery(FILE.CONVERT_GOOD, noticeGoodConvert),
  takeEvery(FILE.CONVERT_BAD, noticeBadConvert),
];

export default noticeSagas;
