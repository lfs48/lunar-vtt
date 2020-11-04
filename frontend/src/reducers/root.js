import { combineReducers } from 'redux';
import sessionReducer from './session/session_reducer';

const rootReducer = combineReducers({
    session: sessionReducer
});

export default rootReducer;