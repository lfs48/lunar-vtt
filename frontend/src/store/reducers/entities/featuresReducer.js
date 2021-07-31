import { createAction, createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const featuresSlice = createSlice({
  name: "features",
  initialState: {},
  reducers: {
    createFeature: state => state,
    editFeature: state => state,
    requestDeleteFeature: state => state,
    deleteFeatureSuccess: (state, action) => {
        delete state[action.payload.feature._id];
    },
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
    [ createAction("dndClasses/receiveAllClasses") ]: (state, action) => {
        action.payload.features.forEach( (feature) => {
            state[feature._id] = feature;
        });
    },
    [ createAction("dndClasses/receiveClass") ]: (state, action) => {
      action.payload.features.forEach( (feature) => {
          state[feature._id] = feature;
      });
    },
    [ createAction("subclasses/receiveAllSubclasses") ]: (state, action) => {
        action.payload.features.forEach( (feature) => {
            state[feature._id] = feature;
        });
    },
    [ createAction("subclasses/receiveSubclass") ]: (state, action) => {
        action.payload.features.forEach( (feature) => {
            state[feature._id] = feature;
        });
    },
    [ createAction("dndclasses/deleteClassSuccess") ]: (state, action) => {

        const dndClass = action.payload.dndClass;
        dndClass.levelFeatures.forEach( (levelFeature) => {
            const id = levelFeature.feature
            const feature = state[id];
            feature.sources = feature.sources.filter(sourceId => sourceId !== dndClass._id);
            state[id] = feature;
        });
        
    },
    [ createAction("races/receiveAllRaces") ]: (state, action) => {
        action.payload.features.forEach( (feature) => {
            state[feature._id] = feature;
        });
    },
    [ createAction("races/receiveRace") ]: (state, action) => {
        action.payload.features.forEach( (feature) => {
            state[feature._id] = feature;
        });
    },
    [ createAction("races/deleteRaceSuccess") ]: (state, action) => {
        const race = action.payload.race;
        race.features.forEach( (id) => {
            const feature = state[id];
            feature.sources = feature.sources.filter(sourceId => sourceId !== race._id);
            state[id] = feature;
        });
    },
  }
});

export const { createFeature, editFeature, receiveAllFeatures, receiveFeature, deleteFeatureSuccess, requestDeleteFeature } = featuresSlice.actions;
export const featuresSliceName = featuresSlice.name;
export default featuresSlice.reducer;