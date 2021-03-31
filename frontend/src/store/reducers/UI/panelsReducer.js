import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dndClass: [],
    feature: []
};

const panelsSlice = createSlice({
  name: 'panels',
  initialState: initialState,
  reducers: {
      togglePanel: (state, action) => {
        if (state[action.payload.panelType].includes(action.payload.id)) {
            state[action.payload.panelType] = state[action.payload.panelType].filter( (id) => id !== action.payload.id );
        } else {
            state[action.payload.panelType].push(action.payload.id);
        }
      }
  }
});

export const {togglePanel} = panelsSlice.actions;
export default panelsSlice.reducer;