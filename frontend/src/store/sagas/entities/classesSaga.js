import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getAllClasses, patchClass } from '../../../util/api/apiClassesUtil';
import { editClass, fetchAllClassesRequested, receiveAllClasses, receiveClass } from '../../reducers/entities/classesReducer';

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

// Handle userLogout actions by calling logoutUser worker
function* fetchClassesSaga() {
    yield takeLatest(fetchAllClassesRequested.type, fetchClassesWorker);
};

function* editClassSaga() {
    yield takeLatest(editClass.type, editClassWorker);
}

// Run all user sagas
export function* classesSaga() {
    yield all([
        fetchClassesSaga(),
        editClassSaga()
    ])
};