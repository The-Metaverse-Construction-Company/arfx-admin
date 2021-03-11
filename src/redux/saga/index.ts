import { all } from 'redux-saga/effects';
import ScenesSaga from './ScenesSaga';

export default function* rootSaga() {
  yield all([ScenesSaga()]);
}
