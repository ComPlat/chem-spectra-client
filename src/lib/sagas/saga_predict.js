import {
  call, put, takeEvery,
} from 'redux-saga/effects';

import { PREDICT } from '../constants/action_type';
import FetcherPredict from '../fetchers/fetcher_predict';


function* predictByServer(action) {
  const { payload } = action;

  const rsp = yield call(FetcherPredict.predict, payload);

  if (rsp && rsp.status) {
    yield put({
      type: PREDICT.PREDICT_DONE,
      payload: { result: rsp.result },
    });
  } else {
    yield put({
      type: PREDICT.PREDICT_FAIL,
      payload: {},
    });
  }
}

const predictSagas = [
  takeEvery(PREDICT.PREDICT_INIT, predictByServer),
];

export default predictSagas;
