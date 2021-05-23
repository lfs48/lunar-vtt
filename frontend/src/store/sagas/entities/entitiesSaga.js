import { all } from 'redux-saga/effects';
import { classesSaga } from './classesSaga';
import { featuresSaga } from './featuresSaga';
import { subclassesSaga } from './subclassesSaga';

export default function* entitiesSaga() {
    yield all([
      classesSaga(),
      subclassesSaga(),
      featuresSaga()
    ])
};