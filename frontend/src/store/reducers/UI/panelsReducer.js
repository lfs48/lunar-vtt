import { createSlice } from "@reduxjs/toolkit";
import { deleteClassSuccess } from "../entities/classesReducer";
import { deleteFeatureSuccess } from "../entities/featuresReducer";
import { deleteSubclassSuccess } from "../entities/subclassesReducer";

const panelsSlice = createSlice({
  name: 'panels',
  initialState: [],
  reducers: {
      openPanel: (state, action) => {
        const i = state.findIndex( (panel) => panel.id === action.payload.id);
        if (i >= 0) {
          state.push(state.splice(i, 1)[0]);
        } else {
          state.push({
            id: action.payload.id,
            panelType: action.payload.panelType,
            edit: false
          });
        }
      },
      closePanel: (state, action) => {
        return state.filter( (panel) => panel.id !== action.payload.id);
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
  },
  extraReducers: {
    [deleteClassSuccess.type]: (state, action) => {
      return state.filter( (panel) => panel.id !== action.payload.dndClass._id);
    },
    [deleteFeatureSuccess.type]: (state, action) => {
      return state.filter( (panel) => panel.id !== action.payload.feature._id);
    },
    [deleteSubclassSuccess.type]: (state, action) => {
      return state.filter( (panel) => panel.id !== action.payload.subclass._id);
    }
  }
});

export const {openPanel, closePanel, editPanel, viewPanel, selectPanel} = panelsSlice.actions;
export default panelsSlice.reducer;