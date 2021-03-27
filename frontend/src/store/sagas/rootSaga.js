import { all } from 'redux-saga/effects';
import { userSaga } from './user/userSaga';

// Run all sagas
export default function* rootSaga() {
  yield all([
    userSaga()
  ])
};