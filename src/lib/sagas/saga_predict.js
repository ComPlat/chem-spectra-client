import {
  call, put, takeEvery,
} from 'redux-saga/effects';

import { PREDICT } from '../constants/action_type';
import FetcherPredict from '../fetchers/fetcher_predict';


function* predictByServer(action) {
  const { payload } = action;

  const rsp = yield call(FetcherPredict.predict, payload);

  if (rsp && rsp.outline.code <= 299) {
    yield put({
      type: PREDICT.PREDICT_DONE,
      payload: rsp,
    });
  } else {
    yield put({
      type: PREDICT.PREDICT_FAIL,
      payload: rsp,
    });
  }
}

const predictSagas = [
  takeEvery(PREDICT.PREDICT_INIT, predictByServer),
];

export default predictSagas;
