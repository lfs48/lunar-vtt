import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";
import { receiveAllClasses } from "./classesReducer";

const initialState = {
    1: {
        id: 1,
        name: 'Extra Attack',
        description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
        featureType: 'Passive'
    },
    2: {
        id: 2,
        name: 'Reckless Attack',
        description: 'You can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
        featureType: 'Triggered'
    },
    3: {
        id: 3,
        name: 'Rage',
        description: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.',
        featureType: 'Bonus Action'
    }
};

const featuresSlice = createSlice({
  name: entityTypes.FEATURES,
  initialState: {},
  reducers: {
  },
  extraReducers: {
    [receiveAllClasses.type]: (state, action) => {
        action.payload.features.forEach( (feature) => {
            state[feature._id] = feature;
        });
    }
  }
});

export const {} = featuresSlice.actions;
export default featuresSlice.reducer;