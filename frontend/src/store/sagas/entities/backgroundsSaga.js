import { all, call, put, takeLatest } from 'redux-saga/effects';
import { deleteBackground, getAllbackgrounds, patchBackground, postBackground } from '../../../util/api/apiBackgroundsUtil';
import entityTypes from '../../../util/types/entityTypes';
import { createBackground, deleteBackgroundRequest, deleteBackgroundSuccess, editBackground, fetchAllBackgrounds, receiveAllBackgrounds, receiveBackground, removeBackground } from '../../reducers/entities/backgroundsReducer';
import { openPanel } from '../../reducers/UI/panelsReducer';

function* fetchBackgroundsWorker(action) {
    try {
        const res = yield call(getAllbackgrounds);
        yield put({
            type: receiveAllBackgrounds.type, 
            payload: res
        });
    } catch (e) {
        console.log(e);
    }
};

function* editBackgroundWorker(action) {
    try {
        const res = yield call(patchBackground, action.payload);
        if (res.success) {
            yield put({
                type: receiveBackground.type,
                payload: res
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* createBackgroundWorker(action) {
    try {
        const res = yield call(postBackground, action.payload);
        if (res.success) {
            yield put({
                type: receiveBackground.type,
                payload: res
            });
            yield put({
                type: openPanel.type,
                payload: {
                    id: res.background._id,
                    panelType: entityTypes.BACKGROUNDS,

                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* deleteBackgroundWorker(action) {
    try {
        const res = yield call(deleteBackground, action.payload);
        if (res.success) {
            yield put({
                type: deleteBackgroundSuccess.type,
                payload: res
            })
        }
    } catch (e) {
        console.log(e);
    }
}

function* fetchBackgroundsSaga() {
    yield takeLatest(fetchAllBackgrounds.type, fetchBackgroundsWorker);
};

function* editBackgroundSaga() {
    yield takeLatest(editBackground.type, editBackgroundWorker);
}

function* createBackgroundSaga() {
    yield takeLatest(createBackground.type, createBackgroundWorker)
}

function* deleteBackgroundSaga() {
    yield takeLatest(deleteBackgroundRequest.type, deleteBackgroundWorker)
}

export function* BackgroundsSaga() {
    yield all([
        fetchBackgroundsSaga(),
        editBackgroundSaga(),
        createBackgroundSaga(),
        deleteBackgroundSaga()
    ])
};