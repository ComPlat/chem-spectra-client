import { all } from 'redux-saga/effects';
import fileSagas from './saga_file';
import predictSagas from './saga_predict';

export default function* rootSaga() {
  yield all([
    ...fileSagas,
    ...predictSagas,
  ]);
}
