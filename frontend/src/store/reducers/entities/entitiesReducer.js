import { combineReducers } from "redux";
import classesReducer from "./classesReducer";
import featuresReducer from "./featuresReducer";

const entitiesReducer = combineReducers({
    dndClasses: classesReducer,
    features: featuresReducer
});

export default entitiesReducer;