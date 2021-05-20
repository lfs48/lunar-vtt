import { all } from 'redux-saga/effects';
import { classesSaga } from './classesSaga';
import { featuresSaga } from './featuresSaga';

export default function* entitiesSaga() {
    yield all([
      classesSaga(),
      featuresSaga()
    ])
};