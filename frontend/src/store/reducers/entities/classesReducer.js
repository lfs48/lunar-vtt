import { createSlice } from "@reduxjs/toolkit";

const classesSlice = createSlice({
  name: 'dndClasses',
  initialState: {},
  reducers: {
    fetchAllClassesRequested: state => state,
    createClass: state => state,
    editClass: state => state,
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
  }
});

export const { fetchAllClassesRequested, receiveAllClasses, createClass, editClass, receiveClass } = classesSlice.actions;
export const classesSliceName = classesSlice.name;
export default classesSlice.reducer;