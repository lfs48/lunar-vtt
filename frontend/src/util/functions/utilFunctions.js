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