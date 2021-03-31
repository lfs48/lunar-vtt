import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const characterSlice = createSlice({
  name: entityTypes.CHARACTERS,
  initialState: initialState,
  reducers: {
  }
});

export const {} = characterSlice.actions;
export default characterSlice.reducer;