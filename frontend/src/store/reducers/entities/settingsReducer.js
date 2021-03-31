import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const settingSlice = createSlice({
  name: entityTypes.SETTINGS,
  initialState: initialState,
  reducers: {
  }
});

export const {} = settingSlice.actions;
export default settingSlice.reducer;