import { all } from 'redux-saga/effects';
import entitiesSaga from './entities/entitiesSaga';
import { userSaga } from './user/userSaga';

// Run all sagas
export default function* rootSaga() {
  yield all([
    userSaga(),
    entitiesSaga()
  ])
};