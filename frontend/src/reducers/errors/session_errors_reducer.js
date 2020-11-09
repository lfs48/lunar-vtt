import { RECEIVE_SESSION_ERRORS, RECEIVE_USER_LOGIN } from '../../actions/types';
  
const sessionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch(action.type) {
        default:
            return state;
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_USER_LOGIN:
            return [];
    }
};

export default sessionErrorsReducer;
  