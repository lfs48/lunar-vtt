import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGIN, RECEIVE_USER_LOGOUT } from '../../actions/types';
import {merge} from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {

    default: return state;
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.user,
        isLoggedIn: !!action.user,
        user: action.user
      };
    case RECEIVE_USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true
      }
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        isLoggedIn: false,
        user: undefined
      };
  }

};

export default sessionReducer;