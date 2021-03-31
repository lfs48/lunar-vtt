import { faAddressBook, faDiceD20, faBookReader, faHatWizard, faRing, faMeteor, faSpider, faCog, faMale, faAward, faFistRaised } from '@fortawesome/free-solid-svg-icons';

const entityTypes = {
    CHARACTERS: "characters",
    CLASSES: "dndClasses",
    RACES: "races",
    SPELLS: "spells",
    FEATURES: "features",
    FEATS: "feats",
    ITEMS: "items",
    MONSTERS: "monsters",
    ROLLABLE: "rollables",
    RULES: "rules",
    SETTINGS: "settings"
};

export default entityTypes;

export function getEntityIcon(entityType) {
    let res;
    switch(entityType) {
        case(entityTypes.CHARACTERS):
            res = faAddressBook;
            break;
        case(entityTypes.CLASSES):
            res = faHatWizard;
            break;
        case(entityTypes.RACES):
            res = faMale;
            break;
        case(entityTypes.SPELLS):
            res = faMeteor;
            break;
        case(entityTypes.ITEMS):
            res = faRing;
            break;
        case(entityTypes.RULES):
            res = faBookReader;
            break;
        case(entityTypes.MONSTERS):
            res = faSpider;
            break;
        case(entityTypes.SETTINGS):
            res = faCog;
            break;
        case(entityTypes.FEATURES):
            res = faFistRaised;
            break;
        case(entityTypes.FEATS):
            res = faAward;
            break;
        case(entityTypes.ROLLABLE):
            res = faDiceD20;
            break;
        default:
            res = <></>;
            break;
    }
    return res;
};

export function getEntityName(entityType) {
    let res;
    switch(entityType) {
        case(entityTypes.CHARACTERS):
            res = 'Characters';
            break;
        case(entityTypes.CLASSES):
            res = 'Classes';
            break;
        case(entityTypes.RACES):
            res = 'Races';
            break;
        case(entityTypes.SPELLS):
            res = 'Spells';
            break;
        case(entityTypes.ITEMS):
            res = 'Items';
            break;
        case(entityTypes.RULES):
            res = 'Rules';
            break;
        case(entityTypes.MONSTERS):
            res = 'Monsters';
            break;
        case(entityTypes.SETTINGS):
            res = 'Settings';
            break;
        case(entityTypes.FEATURES):
            res = 'Features'
            break;
        case(entityTypes.FEATS):
            res = 'Feats';
            break;
        case(entityTypes.ROLLABLE):
            res = 'Rollable Tables';
            break;
        default:
            res = '';
            break;
    }
    return res;
};