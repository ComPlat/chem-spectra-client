import { all } from 'redux-saga/effects';
import fileSagas from './saga_file';
import noticeSagas from './saga_notice';

export default function* rootSaga() {
  yield all([
    ...fileSagas,
    ...noticeSagas,
  ]);
}
