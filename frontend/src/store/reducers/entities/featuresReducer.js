import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";
import { receiveAllClasses, receiveClass } from "./classesReducer";

const featuresSlice = createSlice({
  name: "features",
  initialState: {},
  reducers: {
      createFeature: state => state,
      editFeature: state => state,
      receiveAllFeatures: (state, action) => {
        const newState = {};
        action.payload.features.forEach( (feature) => {
            newState[feature._id] = feature;
        });
        return newState;
    },
    receiveFeature: (state, action) => {
        const feature = action.payload.feature
        state[feature._id] = feature;
    }
  },
  extraReducers: {
    [receiveAllClasses.type]: (state, action) => {
        action.payload.features.forEach( (feature) => {
            state[feature._id] = feature;
        });
    },
    [receiveClass.type]: (state, action) => {
      action.payload.features.forEach( (feature) => {
          state[feature._id] = feature;
      });
  }
  }
});

export const { createFeature, editFeature, receiveAllFeatures, receiveFeature } = featuresSlice.actions;
export const featuresSliceName = featuresSlice.name;
export default featuresSlice.reducer;