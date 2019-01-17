import { all } from 'redux-saga/effects';
import fileSagas from './saga_file';

export default function* rootSaga() {
  yield all([
    ...fileSagas,
  ]);
}
