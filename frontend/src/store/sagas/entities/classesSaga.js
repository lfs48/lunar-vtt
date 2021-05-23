import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getAllClasses, patchClass, postClass } from '../../../util/api/apiClassesUtil';
import entityTypes from '../../../util/types/entityTypes';
import { createClass, editClass, fetchAllClassesRequested, receiveAllClasses, receiveClass } from '../../reducers/entities/classesReducer';
import { openPanel } from '../../reducers/UI/panelsReducer';

function* fetchClassesWorker(action) {
    try {
        const res = yield call(getAllClasses);
        // Dispatch userFetchSucceeded action with user data from response to add user to redux store state
        yield put({
            type: receiveAllClasses.type, 
            payload: {
                classes: res.classes,
                features: res.features
            } 
        });
    } catch (e) {
        // If there's an error, dispatch userFetchFailed action to add error to redux store state
        console.log(e);
    }
};

function* editClassWorker(action) {
    try {
        const res = yield call(patchClass, action.payload);
        if (res.success) {
            yield put({
                type: receiveClass.type,
                payload: res
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* createClassWorker(action) {
    try {
        const res = yield call(postClass, action.payload);
        if (res.success) {
            yield put({
                type: receiveClass.type,
                payload: res
            });
            yield put({
                type: openPanel.type,
                payload: {
                    id: res.dndClass._id,
                    panelType: entityTypes.CLASSES,

                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

// Handle userLogout actions by calling logoutUser worker
function* fetchClassesSaga() {
    yield takeLatest(fetchAllClassesRequested.type, fetchClassesWorker);
};

function* editClassSaga() {
    yield takeLatest(editClass.type, editClassWorker);
}

function* createClassSaga() {
    yield takeLatest(createClass.type, createClassWorker)
}

// Run all user sagas
export function* classesSaga() {
    yield all([
        fetchClassesSaga(),
        editClassSaga(),
        createClassSaga()
    ])
};