import { all } from 'redux-saga/effects';
import { classesSaga } from './classesSaga';

export default function* entitiesSaga() {
    yield all([
      classesSaga()
    ])
};