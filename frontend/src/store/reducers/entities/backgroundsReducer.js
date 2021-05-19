import { createSlice } from "@reduxjs/toolkit";

const backgroundSlice = createSlice({
  name: 'backgrounds',
  initialState: {},
  reducers: {}
});

export const {  } = backgroundSlice.actions;
export const backgroundSliceName = backgroundSlice.name;
export default backgroundSlice.reducer;