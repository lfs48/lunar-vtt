import { RECEIVE_USER_LOGIN, RECEIVE_USER_LOGOUT } from '../../actions/types';

const initialState = {
  isAuthenticated: false,
  isLoggedIn: false,
  user: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {

    default: return state;
    case RECEIVE_USER_LOGIN:
      return {
        isAuthenticated: true,
        isLoggedIn: true,
        user: action.user
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