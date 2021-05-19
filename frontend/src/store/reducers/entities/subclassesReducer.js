import { createSlice } from "@reduxjs/toolkit";

const subclassesSlice = createSlice({
  name: 'subclasses',
  initialState: {},
  reducers: {}
});

export const {  } = subclassesSlice.actions;
export const subclassesSliceName = subclassesSlice.name;
export default subclassesSlice.reducer;