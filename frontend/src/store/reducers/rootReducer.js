import entitiesReducer from "./entities/entitiesReducer";
import sessionReducer from "./session/sessionReducer";
import UIreducer from "./UI/UIreducer";

const rootReducer = {
    session: sessionReducer,
    entities: entitiesReducer,
    UI: UIreducer
};

export default rootReducer;