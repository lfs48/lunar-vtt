import { combineReducers } from "redux";
import panelsReducer from "./panelsReducer";

const UIreducer = combineReducers({
    panels: panelsReducer,
});

export default UIreducer;