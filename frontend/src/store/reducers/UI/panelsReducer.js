import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dndClasses: {},
    features: {},
    characters: {},
    feats: {},
    items: {},
    monsters: {},
    races: {},
    rollables: {},
    rules: {},
    spells: {}
};

const panelsSlice = createSlice({
  name: 'panels',
  initialState: initialState,
  reducers: {
      togglePanel: (state, action) => {
        if ( state[action.payload.panelType][action.payload.id] ) {
          delete state[action.payload.panelType][action.payload.id];
        } else {
            state[action.payload.panelType][action.payload.id] = {
              edit: false
            }
        }
      },
      setPanelView: (state, action) => {
        state[action.payload.panelType][action.payload.id].edit = false;
      }, setPanelEdit: (state, action) => {
        state[action.payload.panelType][action.payload.id].edit = true;
      }
  }
});

export const {togglePanel, setPanelEdit, setPanelView} = panelsSlice.actions;
export default panelsSlice.reducer;