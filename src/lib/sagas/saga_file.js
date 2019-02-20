import base64 from 'base-64';
import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import { FN } from 'react-spectra-viewer';

import { FILE } from '../constants/action_type';
import { VerifyExt, VerifySize } from '../utils/util_file';
import FetcherFile from '../fetchers/fetcher_file';

function* analysisFile(action) {
  const { payload } = action;
  const { file } = payload;
  const isValidExt = VerifyExt(file);
  const isValidSize = VerifySize(file);

  if (isValidExt && isValidSize) {
    yield put({
      type: FILE.CONVERT_INIT,
      payload,
    });
  } else {
    yield put({
      type: FILE.ADD_FAIL,
      payload,
    });
  }
}

function* convertFile(action) {
  const { payload } = action;
  const { file } = payload;

  const rsp = yield call(FetcherFile.convertFile, file);

  if (rsp && rsp.status) {
    const { jcamp, img } = rsp;
    const raw = base64.decode(jcamp);
    const jcampData = FN.ExtractJcamp(raw);
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

const getFileSrc = state => state.file.src;

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
  takeEvery(FILE.CONVERT_INIT, convertFile),
  takeEvery(FILE.SAVE_INIT, saveFile),
];

export default fileSagas;
