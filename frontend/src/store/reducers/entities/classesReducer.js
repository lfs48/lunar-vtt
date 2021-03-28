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
    },
    3: {
        name: 'Artificer',
        description: '',
        features: {
            1: [3],
            2: [2],
            5: [1]
        }
    },
    4: {
        name: 'Bard',
        description: '',
        features: {
            1: [3],
            2: [2],
            5: [1]
        }
    },
    5: {
        name: 'Cleric',
        description: '',
        features: {
            1: [3],
            2: [2],
            5: [1]
        }
    },
    6: {
        name: 'Druid',
        description: '',
        features: {
            1: [3],
            2: [2],
            5: [1]
        }
    },
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