/* eslint-disable import/no-anonymous-default-export */
import { Action } from '@reduxjs/toolkit';
import { takeLeading, put, call } from 'redux-saga/effects';
import { PostLogin } from '../../api/AdminApi';
import { performAdminLogin, setAdmin, setAdminError } from '../slice/AdminSlice';

function* LoginAdminAsync(action: Action) {
  if (performAdminLogin.match(action)) {
    try {
      const user = yield call(PostLogin, action.payload);
      yield put(setAdmin(user));
    } catch (err) {
      const error = new Error(err);
      yield put(setAdminError(error.message));
    }
  }
}

export default function* () {
  yield takeLeading(performAdminLogin.type, LoginAdminAsync);
}
