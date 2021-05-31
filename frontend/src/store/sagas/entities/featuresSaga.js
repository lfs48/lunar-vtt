import { all, call, put, takeLatest } from 'redux-saga/effects';
import { postFeature, patchFeature, deleteFeature } from '../../../util/api/apiFeaturesUtil';
import entityTypes from '../../../util/types/entityTypes';
import { createFeature, editFeature, receiveFeature, deleteFeatureSuccess, requestDeleteFeature } from '../../reducers/entities/featuresReducer';
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

function* deleteFeatureWorker(action) {
    try {
        const res = yield call(deleteFeature, action.payload);
        if (res.success) {
            yield put({
                type: deleteFeatureSuccess.type,
                payload: res
            })
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

function* deleteFeatureSaga() {
    yield takeLatest(requestDeleteFeature.type, deleteFeatureWorker)
}

export function* featuresSaga() {
    yield all([
        createFeatureSaga(),
        editFeatureSaga(),
        deleteFeatureSaga()
    ])
};