import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import deviceSaga from './deviceSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    deviceSaga(),
    // watchIncrementAsync()
  ]);
}
