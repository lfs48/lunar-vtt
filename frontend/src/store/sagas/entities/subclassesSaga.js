import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getAllSubclasses, patchSubclass, postSubclass } from '../../../util/api/apiSubclassesUtil';
import entityTypes from '../../../util/types/entityTypes';
import { receiveSubclass, editSubclass, createSubclass, receiveAllSubclasses, fetchAllSubclasses } from '../../reducers/entities/subclassesReducer';
import { openPanel } from '../../reducers/UI/panelsReducer';

function* fetchSubclassesWorker(action) {
    try {
        const res = yield call(getAllSubclasses);
        // Dispatch userFetchSucceeded action with user data from response to add user to redux store state
        yield put({
            type: receiveAllSubclasses.type, 
            payload: {
                subclasses: res.subclasses,
                features: res.features
            } 
        });
    } catch (e) {
        // If there's an error, dispatch userFetchFailed action to add error to redux store state
        console.log(e);
    }
};

function* editSubclassWorker(action) {
    try {
        const res = yield call(patchSubclass, action.payload);
        if (res.success) {
            yield put({
                type: receiveSubclass.type,
                payload: res
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* createSubclassWorker(action) {
    try {
        const res = yield call(postSubclass, action.payload);
        if (res.success) {
            yield put({
                type: receiveSubclass.type,
                payload: res
            });
            yield put({
                type: openPanel.type,
                payload: {
                    id: res.subclass._id,
                    panelType: entityTypes.SUBCLASSES,

                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* fetchSubclassesSaga() {
    yield takeLatest(fetchAllSubclasses.type, fetchSubclassesWorker);
}

function* editSubclassSaga() {
    yield takeLatest(editSubclass.type, editSubclassWorker);
}

function* createSubclassSaga() {
    yield takeLatest(createSubclass.type, createSubclassWorker)
}

// Run all user sagas
export function* subclassesSaga() {
    yield all([
        editSubclassSaga(),
        createSubclassSaga(),
        fetchSubclassesSaga()
    ])
};