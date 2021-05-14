import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getAllClasses } from '../../../util/api/apiClassesUtil';
import { fetchAllClassesRequested, receiveAllClasses } from '../../reducers/entities/classesReducer';

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

// Handle userLogout actions by calling logoutUser worker
function* fetchClassesSaga() {
    yield takeLatest(fetchAllClassesRequested.type, fetchClassesWorker);
};

// Run all user sagas
export function* classesSaga() {
    yield all([
        fetchClassesSaga()
    ])
};