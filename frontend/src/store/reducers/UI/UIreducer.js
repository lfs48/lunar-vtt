import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import panelsReducer from "./panelsReducer";

const UIreducer = combineReducers({
    panels: panelsReducer,
    modal: modalReducer
});

export default UIreducer;