import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
};

const raceSlice = createSlice({
  name: entityTypes.RACES,
  initialState: initialState,
  reducers: {
  }
});

export const {} = raceSlice.actions;
export default raceSlice.reducer;