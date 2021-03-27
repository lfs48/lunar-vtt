import {userLoginRequested, userRegisterRequested, userAuthSucceeded, userAuthFailed, logoutUser} from '../../reducers/session/sessionReducer';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiLogin, apiRegister } from '../../../util/api/apiAuthUtil';
import jwt_decode from 'jwt-decode';

function* authUserWorker(action) {
    try {
        // Try to authenticate user with DE API using the auth data from action payload
        let cb;
        if (action.type === userLoginRequested.type) {
            cb = apiLogin;
        } else if (action.type === userRegisterRequested.type) {
            cb = apiRegister;
        }
        const res = yield call(cb, action.payload);
        // Parse response body data
        const {token} = yield res.json();
        // Add jwt access token from response to local storage for auth persistance
        localStorage.setItem('jwtToken', token);
        const user = jwt_decode(token);
        // Dispatch userFetchSucceeded action with user data from response to add user to redux store state
        yield put({
            type: userAuthSucceeded.type, 
            payload: {
                user:user 
            } 
        });
    } catch (e) {
        // If there's an error, dispatch userFetchFailed action to add error to redux store state
        yield put({type: userAuthFailed.type, payload: e.message});
    }
};

function* logoutUserWorker() {
    // Remove access token from local storage
    localStorage.removeItem('jwtToken');
}

// Handle userFetchRequested actions by calling fetchUser worker
function* authUserSaga() {
    yield takeLatest(userLoginRequested.type, authUserWorker);
    yield takeLatest(userRegisterRequested.type, authUserWorker);
};

// Handle userLogout actions by calling logoutUser worker
function* logoutUserSaga() {
    yield takeLatest(logoutUser.type, logoutUserWorker);
};

// Run all user sagas
export function* userSaga() {
    yield all([
        authUserSaga(),
        logoutUserSaga()
    ])
};