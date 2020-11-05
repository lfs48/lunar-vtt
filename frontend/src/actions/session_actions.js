import * as APIUtil from '../util/api/session_api_util';
import jwt_decode from 'jwt-decode';

import {RECEIVE_USER_LOGIN, RECEIVE_USER_LOGOUT} from './types';

// Standard actions

export const receiveUserLogin = (user) => ({
    type: RECEIVE_USER_LOGIN,
    user
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

// Thunk actions

export const signup = (user) => (dispatch) => (
    APIUtil.signup(user).then( (res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveUserLogin(decoded))
    })
);

export const login = (user) => (dispatch) => (
    APIUtil.login(user).then( (res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveUserLogin(decoded))
    })
);

export const logout = () => dispatch => {
    // Remove the token from local storage
    localStorage.removeItem('jwtToken')
    // Remove the token from the common axios header
    APIUtil.setAuthToken(false)
    // Dispatch a logout action
    dispatch(logoutUser())
};