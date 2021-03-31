import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const monsterSlice = createSlice({
  name: entityTypes.MONSTERS,
  initialState: initialState,
  reducers: {
  }
});

export const {} = monsterSlice.actions;
export default monsterSlice.reducer;