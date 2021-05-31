import { createAction, createSlice } from "@reduxjs/toolkit";

const classesSlice = createSlice({
  name: 'dndClasses',
  initialState: {},
  reducers: {
    fetchAllClassesRequested: state => state,
    createClass: state => state,
    editClass: state => state,
    requestDeleteClass: state => state,
    deleteClassSuccess: (state, action) => {
      delete state[action.payload.dndClass._id]
    },
    receiveAllClasses: (state, action) => {
        const newState = {};
        action.payload.classes.forEach( (dndClass) => {
            newState[dndClass._id] = dndClass;
        });
        return newState;
    },
    receiveClass: (state, action) => {
        const dndClass = action.payload.dndClass
        state[dndClass._id] = dndClass;
    }
  },
  extraReducers: {
    [ createAction("subclasses/receiveSubclass") ]: (state, action) => {
      const subclass = action.payload.subclass;
      if ( !state[subclass.dndClass].subclasses.includes(subclass._id) ) {
        state[subclass.dndClass].subclasses.push(subclass._id);
      }
    },
    [ createAction("features/deleteFeatureSuccess") ]: (state, action) => {
      const feature =  action.payload.feature;
      if (feature.sourceModel === "DndClass") {
        feature.sources.forEach( (id) => {
          const dndClass = state[id];
          const newFeatures = {};
          Object.entries(dndClass.features).forEach( ([level, arr]) => {
            newFeatures[level] = arr.filter( featureId => featureId !== feature._id);
          });
          dndClass.features = newFeatures;
        });
      }

    }
  }
});

export const { fetchAllClassesRequested, receiveAllClasses, createClass, editClass, receiveClass, requestDeleteClass, deleteClassSuccess } = classesSlice.actions;
export const classesSliceName = classesSlice.name;
export default classesSlice.reducer;