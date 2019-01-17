import base64 from 'base-64';
import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import { ExtractJcamp } from 'react-spectra-viewer';

import { FILE } from '../constants/action_type';
import { VerifyExt, VerifySize } from '../utils/file';
import Fetcher from '../fetchers/file';

function* analysisFile(action) {
  const { payload } = action;
  const { file } = payload;
  const isValidExt = VerifyExt(file);
  const isValidSize = VerifySize(file);

  if (isValidExt && isValidSize) {
    yield put({
      type: FILE.CONVERT,
      payload,
    });
  } else {
    yield put({
      type: FILE.ADD_BAD,
      payload,
    });
  }
}

function* convertFile(action) {
  const { payload } = action;
  const { file } = payload;

  const rsp = yield call(Fetcher.convertFile, file);
  const { jcamp, img } = rsp;
  const raw = base64.decode(jcamp);
  const jcampData = ExtractJcamp(raw);
  if (rsp && rsp.status) {
    yield put({
      type: FILE.CONVERT_GOOD,
      payload: Object.assign({}, { file, img, jcamp: jcampData }),
    });
  } else {
    yield put({
      type: FILE.CONVERT_BAD,
      payload,
    });
  }
}

const getFileSrc = state => state.file.src;

function* saveFile(action) {
  const { payload } = action;

  const src = yield select(getFileSrc);
  const { name } = src;
  const filename = name.split('.').slice(0, -1).join('.');
  const target = Object.assign({}, payload, { src, filename });

  yield call(Fetcher.saveFile, target);
}

const fileSagas = [
  takeEvery(FILE.ADD, analysisFile),
  takeEvery(FILE.CONVERT, convertFile),
  takeEvery(FILE.SAVE, saveFile),
];

export default fileSagas;
