import { Action } from '@reduxjs/toolkit';
import { takeLeading, put } from 'redux-saga/effects';
import { fetchUserData, setUserData } from '../slice/UserSlice';

function* FetchUserDataAsync(action: Action) {
  if (fetchUserData.match(action)) {
    const userId = action.payload;

    console.log(userId);

    // const fetchedUser = yield call(userApi.getUser, userId);
    yield put(setUserData('Hanzla'));
  }
}

export default function* () {
  yield takeLeading(fetchUserData.type, FetchUserDataAsync);
}
