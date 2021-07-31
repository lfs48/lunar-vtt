import { all } from 'redux-saga/effects';
import { BackgroundsSaga } from './backgroundsSaga';
import { classesSaga } from './classesSaga';
import { featuresSaga } from './featuresSaga';
import { racesSaga } from './racesSaga';
import { subclassesSaga } from './subclassesSaga';

export default function* entitiesSaga() {
    yield all([
      classesSaga(),
      subclassesSaga(),
      featuresSaga(),
      racesSaga(),
      BackgroundsSaga()
    ])
};