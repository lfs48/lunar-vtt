import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
      open: false,
      modalType: null,
      data: {}
  },
  reducers: {
    openModal: (state, action) => {
        state.open = true;
        state.modalType = action.payload.modalType
        state.data = action.payload.data
    },
    closeModal: (state) => {
        state.open = false;
        state.modalType = null;
        state.data = {};
    }
  }
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;