import { createSlice } from "@reduxjs/toolkit";

const backgroundSlice = createSlice({
  name: 'backgrounds',
  initialState: {},
  reducers: {
    fetchAllBackgrounds: state => state,
    createBackground: state => state,
    editBackground: state => state,
    deleteBackgroundRequest: state => state,
    removeBackgroundSuccess: (state, action) => {
      delete state[action.payload.background._id]
    },
    receiveAllBackgrounds: (state, action) => {
        const newState = {};
        action.payload.backgrounds.forEach( (background) => {
            newState[background._id] = background;
        });
        return newState;
    },
    receiveBackground: (state, action) => {
        const background = action.payload.background
        state[background._id] = background;
    }
  }
});

export const { fetchAllBackgrounds, createBackground, editBackground, deleteBackgroundRequest, deleteBackgroundSuccess, receiveAllBackgrounds, receiveBackground } = backgroundSlice.actions;
export const backgroundSliceName = backgroundSlice.name;
export default backgroundSlice.reducer;