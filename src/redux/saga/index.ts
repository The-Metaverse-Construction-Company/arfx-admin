import { all } from 'redux-saga/effects';
import UserSaga from './UserSaga';

export default function* rootSaga() {
  yield all([UserSaga()]);
}
