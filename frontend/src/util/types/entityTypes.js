import { faAddressBook, faDiceD20, faBookReader, faHatWizard, faRing, faMeteor, faSpider, faCog, faMale, faAward, faFistRaised, faMonument, faDna, faStar, faTheaterMasks } from '@fortawesome/free-solid-svg-icons';

const entityTypes = {
    CHARACTERS: "characters",
    CLASSES: "dndClasses",
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
    let res;
    switch(entityType) {
        case(entityTypes.CHARACTERS):
            res = 'fas fa-address-book';
            break;
        case(entityTypes.CLASSES):
            res = 'fas fa-sword';
            break;
        case(entityTypes.RACES):
            res = 'fas fa-skull-cow';
            break;
        case(entityTypes.SPELLS):
            res = 'fas fa-meteor';
            break;
        case(entityTypes.ITEMS):
            res = 'fas fa-flask-potion';
            break;
        case(entityTypes.RULES):
            res = 'fas fa-books';
            break;
        case(entityTypes.MONSTERS):
            res = 'fas fa-spider';
            break;
        case(entityTypes.SETTINGS):
            res = 'fas fa-user-cog';
            break;
        case(entityTypes.FEATURES):
            res = 'fas fa-star';
            break;
        case(entityTypes.FEATS):
            res = 'fas fa-award';
            break;
        case(entityTypes.ROLLABLE):
            res = 'fas fa-scroll-old';
            break;
        case(entityTypes.SUBCLASSES):
            res = 'fas fa-swords';
            break;
        case(entityTypes.BACKGROUNDS):
            res = 'fas fa-landmark';
            break;
        default:
            res = <></>;
            break;
    }
    return res;
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
        case(entityTypes.BACKGROUNDS):
            res = 'Backgrounds';
            break;
        case(entityTypes.SUBCLASSES):
            res = 'Subclasses';
            break;
        default:
            res = '';
            break;
    }
    return res;
};