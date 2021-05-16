import { createSlice } from "@reduxjs/toolkit";

const panelsSlice = createSlice({
  name: 'panels',
  initialState: [],
  reducers: {
      openPanel: (state, action) => {
        state.push({
          id: action.payload.id,
          panelType: action.payload.panelType,
          edit: false
        });
      },
      closePanel: (state, action) => {
        state.filter( (panel) => panel.id !== action.payload.id);
      },
      editPanel: (state, action) => {
        const i = state.findIndex( (panel) => panel.id === action.payload.id);
        state[i].edit = true;
      },
      viewPanel: (state, action) => {
        const i = state.findIndex( (panel) => panel.id === action.payload.id);
        state[i].edit = false;
      },
      selectPanel: (state, action) => {
        const i = state.findIndex( (panel) => panel.id === action.payload.id);
        state.push(state.splice(i, 1)[0]);
      }
  }
});

export const {openPanel, closePanel, editPanel, viewPanel, selectPanel} = panelsSlice.actions;
export default panelsSlice.reducer;