import { all, call, put, takeLatest } from 'redux-saga/effects';
import { postFeature, patchFeature } from '../../../util/api/apiFeaturesUtil';
import entityTypes from '../../../util/types/entityTypes';
import { createFeature, editFeature, receiveFeature } from '../../reducers/entities/featuresReducer';
import { openPanel } from '../../reducers/UI/panelsReducer';

function* editFeatureWorker(action) {
    try {
        const res = yield call(patchFeature, action.payload);
        if (res.success) {
            yield put({
                type: receiveFeature.type,
                payload: {
                    feature: res.feature
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* createFeatureWorker(action) {
    try {
        const res = yield call(postFeature, action.payload);
        if (res.success) {
            yield put({
                type: receiveFeature.type,
                payload: {
                    feature: res.feature
                }
            });
            yield put({
                type: openPanel.type,
                payload: {
                    id: res.feature._id,
                    panelType: entityTypes.FEATURES,

                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* editFeatureSaga() {
    yield takeLatest(editFeature.type, editFeatureWorker);
}

function* createFeatureSaga() {
    yield takeLatest(createFeature.type, createFeatureWorker)
}

export function* featuresSaga() {
    yield all([
        createFeatureSaga(),
        editFeatureSaga()
    ])
};