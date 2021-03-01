import { all } from 'redux-saga/effects';
import AdminSaga from './AdminSaga';
import ScenesSaga from './ScenesSaga';

export default function* rootSaga() {
  yield all([ScenesSaga(), AdminSaga()]);
}
