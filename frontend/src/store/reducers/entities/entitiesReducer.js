import { combineReducers } from "redux";
import backgroundsReducer from "./backgroundsReducer";
import charactersReducer from "./charactersReducer";
import classesReducer from "./classesReducer";
import featsReducer from "./featsReducer";
import featuresReducer from "./featuresReducer";
import itemsReducer from "./itemsReducer";
import monstersReducer from "./monstersReducer";
import racesReducer from "./racesReducer";
import rollablesReducer from "./rollablesReducer";
import rulesReducer from "./rulesReducer";
import settingsReducer from "./settingsReducer";
import spellsReducer from "./spellsReducer";
import subclassesReducer from "./subclassesReducer";

const entitiesReducer = combineReducers({
    dndClasses: classesReducer,
    features: featuresReducer,
    characters: charactersReducer,
    feats: featsReducer,
    items: itemsReducer,
    monsters: monstersReducer,
    races: racesReducer,
    rollables: rollablesReducer,
    rules: rulesReducer,
    spells: spellsReducer,
    settings: settingsReducer,
    subclasses: subclassesReducer,
    backgrounds: backgroundsReducer
});

export default entitiesReducer;