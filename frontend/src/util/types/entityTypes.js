import { createBackground } from '../../store/reducers/entities/backgroundsReducer';
import { classesSliceName, createClass } from '../../store/reducers/entities/classesReducer';
import { featuresSliceName, createFeature } from '../../store/reducers/entities/featuresReducer';
import { createRace } from '../../store/reducers/entities/racesReducer';
import { modalTypes } from './modalTypes';

const entityTypes = {
    CHARACTERS: "characters",
    CLASSES: classesSliceName,
    SUBCLASSES: 'subclasses',
    RACES: "races",
    BACKGROUNDS: 'backgrounds',
    FEATS: "feats",
    FEATURES: featuresSliceName,
    SPELLS: "spells",
    ITEMS: "items",
    MONSTERS: "monsters",
    ROLLABLE: "rollables",
    RULES: "rules",
    SETTINGS: "settings"
};

export default entityTypes;

export function getEntityIcon(entityType) {
    switch(entityType) {
        case(entityTypes.CHARACTERS):
            return 'fas fa-address-book';
        case(entityTypes.CLASSES):
            return 'fas fa-sword';
        case(entityTypes.RACES):
            return 'fas fa-skull-cow';
        case(entityTypes.SPELLS):
            return 'fas fa-meteor';
        case(entityTypes.ITEMS):
            return 'fas fa-flask-potion';
        case(entityTypes.RULES):
            return 'fas fa-books';
        case(entityTypes.MONSTERS):
            return 'fas fa-spider';
        case(entityTypes.SETTINGS):
            return 'fas fa-user-cog';
        case(entityTypes.FEATURES):
            return 'fas fa-star';
        case(entityTypes.FEATS):
            return 'fas fa-award';
        case(entityTypes.ROLLABLE):
            return 'fas fa-scroll-old';
        case(entityTypes.SUBCLASSES):
            return 'fas fa-swords';
        case(entityTypes.BACKGROUNDS):
            return 'fas fa-landmark';
        default:
            return <></>;
    }
};

export function getEntityName(entityType) {
    switch(entityType) {
        case(entityTypes.CHARACTERS):
            return 'Characters';
        case(entityTypes.CLASSES):
            return 'Classes';
        case(entityTypes.RACES):
            return 'Races';
        case(entityTypes.SPELLS):
            return 'Spells';
        case(entityTypes.ITEMS):
            return 'Items';
        case(entityTypes.RULES):
            return 'Rules';
        case(entityTypes.MONSTERS):
            return 'Monsters';
        case(entityTypes.SETTINGS):
            return 'Settings';
        case(entityTypes.FEATURES):
            return 'Features'
        case(entityTypes.FEATS):
            return 'Feats';
        case(entityTypes.ROLLABLE):
            return 'Rollable Tables';
        case(entityTypes.BACKGROUNDS):
            return 'Backgrounds';
        case(entityTypes.SUBCLASSES):
            return 'Subclasses';
        default:
            return '';
    }
};

export function getCreateEntityActionType(entityType) {
    switch(entityType) {
        case(entityTypes.CHARACTERS):
            return 'Character';
        case(entityTypes.CLASSES):
            return createClass.type;
        case(entityTypes.RACES):
            return createRace.type
        case(entityTypes.SPELLS):
            return 'Spell';
        case(entityTypes.ITEMS):
            return 'Item';
        case(entityTypes.RULES):
            return 'Rule';
        case(entityTypes.MONSTERS):
            return 'Monster';
        case(entityTypes.SETTINGS):
            return 'Setting';
        case(entityTypes.FEATURES):
            return createFeature.type
        case(entityTypes.FEATS):
            return 'Feat';
        case(entityTypes.ROLLABLE):
            return 'Rollable Table';
        case(entityTypes.BACKGROUNDS):
            return createBackground.type;
        case(entityTypes.SUBCLASSES):
            return 'Subclass';
        default:
            return null;
    }
};

export function getEntityModalType(entityType) {
    switch(entityType) {
        case(entityTypes.CHARACTERS):
            return 'Character';
        case(entityTypes.CLASSES):
            return modalTypes.CLASSFORM
        case(entityTypes.RACES):
            return modalTypes.RACEFORM;
        case(entityTypes.SPELLS):
            return 'Spell';
        case(entityTypes.ITEMS):
            return 'Item';
        case(entityTypes.RULES):
            return 'Rule';
        case(entityTypes.MONSTERS):
            return 'Monster';
        case(entityTypes.SETTINGS):
            return 'Setting';
        case(entityTypes.FEATURES):
            return modalTypes.FEATUREFORM
        case(entityTypes.FEATS):
            return 'Feat';
        case(entityTypes.ROLLABLE):
            return 'Rollable Table';
        case(entityTypes.BACKGROUNDS):
            return modalTypes.BACKGROUNDFORM;
        case(entityTypes.SUBCLASSES):
            return modalTypes.SUBCLASSFORM
        default:
            return null;
    }
};

export function sourceModelToEntityType(sourceType) {
    const modelsToEntities = {
        'DndClass': entityTypes.CLASSES,
        'Feature': entityTypes.FEATURES,
        'Subclass': entityTypes.SUBCLASSES
    }
    return modelsToEntities[sourceType];
}

export function entityTypeToSourceModel(entityType) {
    const entitiesToModels = {
        [entityTypes.CLASSES]: 'DndClass',
        [entityTypes.FEATURE]: 'Feature',
        [entityTypes.SUBCLASSES]: 'Subclass'
    }
    return entitiesToModels[entityType];
}