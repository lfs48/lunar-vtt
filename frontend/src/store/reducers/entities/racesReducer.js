import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const raceSlice = createSlice({
  name: "races",
  initialState: initialState,
  reducers: {
    fetchAllRaces: state => state,
    createRace: state => state,
    editRace: state => state,
    requestDeleteRace: state => state,
    deleteRaceSuccess: (state, action) => {
      delete state[action.payload.race._id]
    },
    receiveAllRaces: (state, action) => {
        const newState = {};
        action.payload.races.forEach( (race) => {
            newState[race._id] = race;
        });
        return newState;
    },
    receiveRace: (state, action) => {
        const race = action.payload.race
        state[race._id] = race;
    }
  }
});

export const {fetchAllRaces, createRace, editRace, requestDeleteRace, deleteRaceSuccess, receiveAllRaces, receiveRace} = raceSlice.actions;
export default raceSlice.reducer;