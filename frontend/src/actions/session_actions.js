import * as APIUtil from '../util/api/session_api_util';
import jwt_decode from 'jwt-decode';

import {RECEIVE_USER_LOGIN, RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT} from './types';

// Standard actions

export const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
});

export const receiveUserLogin = () => ({
    type: RECEIVE_USER_LOGIN
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

// Thunk actions

export const signup = (user) => (dispatch) => (
    APIUtil.signup(user).then( () => (
        dispatch(receiveUserLogin())
    ))
);

export const login = (user) => (dispatch) => (
    APIUtil.login(user).then( (res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
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