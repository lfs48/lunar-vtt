import {merge} from 'lodash';

export const handleInput = (event, field, state, setState, value=null) => {
  event.preventDefault();
  const newState = merge({}, state);
  if (value !== null) {
    newState[field] = value;
  } else {
    newState[field] = event.target.value;
  }
  setState(newState);
};

  
export const intToOrdinal = (n) => {
  if (n === 1 || n === '1') {
      return '1st'
  } else if (n === 2 || n === '2') {
      return '2nd'
  } else if (n === 3 || n === '3') {
      return '3rd'
  } else {
      return n.toString()+'th'
  }
};

export const getLevelProf = (level) => {
  if (level < 5) {
    return 2;
  } else if (level >= 5 && level < 9) {
    return 3;
  } else if (level >= 9 && level < 13) {
    return 4;
  } else if (level >= 13 && level < 17) {
    return 5;
  } else if (level >= 17) {
    return 6;
  }
}