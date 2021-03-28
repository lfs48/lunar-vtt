import entitiesReducer from "./entities/entitiesReducer";
import sessionReducer from "./session/sessionReducer";

const rootReducer = {
    session: sessionReducer,
    entities: entitiesReducer
};

export default rootReducer;