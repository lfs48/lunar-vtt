import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const ruleSlice = createSlice({
  name: entityTypes.RULES,
  initialState: initialState,
  reducers: {
  }
});

export const {} = ruleSlice.actions;
export default ruleSlice.reducer;