import { createSlice } from "@reduxjs/toolkit";

const subclassesSlice = createSlice({
  name: 'subclasses',
  initialState: {},
  reducers: {
    createSubclass: state => state,
    editSubclass: state => state,
    fetchAllSubclasses: state => state,
    receiveAllSubclasses: (state, action) => {
      const newState = {};
      action.payload.subclasses.forEach( (subclass) => {
          newState[subclass._id] = subclass;
      });
      return newState;
    },
    receiveSubclass: (state, action) => {
      const subclass = action.payload.subclass;
      state[subclass._id] = subclass;
    }
  }
});

export const { createSubclass, editSubclass, receiveSubclass, receiveAllSubclasses, fetchAllSubclasses } = subclassesSlice.actions;
export const subclassesSliceName = subclassesSlice.name;
export default subclassesSlice.reducer;