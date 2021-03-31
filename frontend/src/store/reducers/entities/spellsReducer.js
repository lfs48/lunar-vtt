import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const spellSlice = createSlice({
  name: entityTypes.SPELLS,
  initialState: initialState,
  reducers: {
  }
});

export const {} = spellSlice.actions;
export default spellSlice.reducer;