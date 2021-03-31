import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const itemSlice = createSlice({
  name: entityTypes.ITEMS,
  initialState: initialState,
  reducers: {
  }
});

export const {} = itemSlice.actions;
export default itemSlice.reducer;