import { faAddressBook, faDiceD20, faBookReader, faHatWizard, faRing, faMeteor, faSpider, faCog, faMale, faAward, faFistRaised, faMonument, faDna, faStar, faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
import { classesSliceName, createClass } from '../../store/reducers/entities/classesReducer';
import { featuresSliceName, createFeature } from '../../store/reducers/entities/featuresReducer';

const entityTypes = {
    CHARACTERS: "characters",
    CLASSES: classesSliceName,
    SUBCLASSES: 'subclasses',
    RACES: "races",
    BACKGROUNDS: 'backgrounds',
    FEATS: "feats",
    FEATURES: "features",
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

// export function getEntityIcon(entityType) {
//     let res;
//     switch(entityType) {
//         case(entityTypes.CHARACTERS):
//             res = faAddressBook;
//             break;
//         case(entityTypes.CLASSES):
//             res = faHatWizard;
//             break;
//         case(entityTypes.RACES):
//             res = faDna;
//             break;
//         case(entityTypes.SPELLS):
//             res = faMeteor;
//             break;
//         case(entityTypes.ITEMS):
//             res = faRing;
//             break;
//         case(entityTypes.RULES):
//             res = faBookReader;
//             break;
//         case(entityTypes.MONSTERS):
//             res = faSpider;
//             break;
//         case(entityTypes.SETTINGS):
//             res = faCog;
//             break;
//         case(entityTypes.FEATURES):
//             res = faStar;
//             break;
//         case(entityTypes.FEATS):
//             res = faAward;
//             break;
//         case(entityTypes.ROLLABLE):
//             res = faDiceD20;
//             break;
//         case(entityTypes.SUBCLASSES):
//             res = faTheaterMasks;
//             break;
//         case(entityTypes.BACKGROUNDS):
//             res = faMonument;
//             break;
//         default:
//             res = <></>;
//             break;
//     }
//     return res;
// };

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
            return 'Race';
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
            return 'Background';
        case(entityTypes.SUBCLASSES):
            return 'Subclass';
        default:
            return null;
    }
};