import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    1: {
        name: 'Barbarian',
        description: '',
        features: {
            1: [3],
            2: [2],
            5: [1]
        }
    },
    2: {
        name: 'Fighter',
        description: '',
        features: {
            5: [1]
        }
    }
};

const classesSlice = createSlice({
  name: 'dndClasses',
  initialState: initialState,
  reducers: {
    classesFetchRequested: state => state,
  }
});

export const {} = classesSlice.actions;
export default classesSlice.reducer;