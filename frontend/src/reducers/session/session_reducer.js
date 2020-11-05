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
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case RECEIVE_USER_LOGIN:
      return {
        ...state,
        isSignedIn: true
      }
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
  }

};

export default sessionReducer;