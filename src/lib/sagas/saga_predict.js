import {
  call, put, takeEvery,
} from 'redux-saga/effects';

import { PREDICT } from '../constants/action_type';
import FetcherPredict from '../fetchers/fetcher_predict';


function* predictByPeaks(action) {
  const { payload } = action;

  const rsp = yield call(FetcherPredict.byPeaks, payload);

  if (rsp && rsp.status) {
    yield put({
      type: PREDICT.BY_PEAKS_DONE,
      payload: { result: rsp.result },
    });
  } else {
    yield put({
      type: PREDICT.BY_PEAKS_FAIL,
      payload: {},
    });
  }
}

const predictSagas = [
  takeEvery(PREDICT.BY_PEAKS_INIT, predictByPeaks),
];

export default predictSagas;
