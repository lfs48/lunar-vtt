import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const featSlice = createSlice({
  name: entityTypes.FEATS,
  initialState: initialState,
  reducers: {
  }
});

export const {} = featSlice.actions;
export default featSlice.reducer;