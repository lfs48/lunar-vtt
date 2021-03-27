import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    user: null,
    errors: null
};

// Session slice of state where data related to currently logged in user lives
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    // Defined only so action type exists for sagas
    userLoginRequested: state => state,
    userRegisterRequested: state => state,
    // Persist user data to store state
    userAuthSucceeded: (state, action) => {
      const user = action.payload.user;
      state.loggedIn = true;
      state.user = user;
      state.errors = null;
    },
    userAuthFailed: (state, action) => {
      state.errors = action.payload;
    },
    logoutUser: (state) => {
      state = initialState;
    }
  }
});

export const {userLoginRequested, userRegisterRequested, userAuthSucceeded, userAuthFailed, logoutUser} = sessionSlice.actions;
export default sessionSlice.reducer;