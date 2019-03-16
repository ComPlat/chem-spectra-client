import base64 from 'base-64';
import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import { FN } from 'react-spectra-viewer';

import { FILE, FORM } from '../constants/action_type';
import { VerifyJcampExt, VerifyRawExt, VerifySize } from '../utils/util_file';
import FetcherFile from '../fetchers/fetcher_file';

function* analysisFile(action) {
  const { payload } = action;
  const { file } = payload;
  const isValidExt = VerifyJcampExt(file) || VerifyRawExt(file);
  const isValidSize = VerifySize(file);

  if (isValidExt && isValidSize) {
    yield put({
      type: FILE.ADD_DONE,
      payload,
    });
  } else {
    yield put({
      type: FILE.ADD_FAIL,
      payload,
    });
  }
}

const getFormScan = state => state.form.scan;

const getFileSrc = state => state.file.src;

function* convertFile(action) {
  const { payload } = action;
  const file = payload.file || (yield select(getFileSrc));
  const scan = yield select(getFormScan);
  const rsp = yield call(FetcherFile.convertFile, { file, scan });

  if (rsp && rsp.status) {
    const { jcamp, img } = rsp;
    const origData = base64.decode(jcamp);
    const jcampData = FN.ExtractJcamp(origData);
    yield put({
      type: FILE.CONVERT_DONE,
      payload: Object.assign({}, { file, img, jcamp: jcampData }),
    });
  } else {
    yield put({
      type: FILE.CONVERT_FAIL,
      payload,
    });
  }
}

function* saveFile(action) {
  const { payload } = action;

  const src = yield select(getFileSrc);
  const { name } = src;
  const filename = name.split('.').slice(0, -1).join('.');
  const target = Object.assign({}, payload, { src, filename });

  yield call(FetcherFile.saveFile, target);
  yield put({
    type: FILE.SAVE_DONE,
  });
}

const fileSagas = [
  takeEvery(FILE.ADD_INIT, analysisFile),
  takeEvery(FORM.SUBMIT, convertFile),
  takeEvery(FILE.SAVE_INIT, saveFile),
];

export default fileSagas;
