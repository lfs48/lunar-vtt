import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const rollableSlice = createSlice({
  name: entityTypes.ROLLABLE,
  initialState: initialState,
  reducers: {
  }
});

export const {} = rollableSlice.actions;
export default rollableSlice.reducer;