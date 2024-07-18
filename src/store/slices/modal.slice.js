import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isVisible: false, 
    message: '',
    type: '',
  },
  reducers: {
    showModal: (state, { payload }) => {
      state.isVisible = true;
      state.message = payload.message
      state.type = payload.type
    },
    hideModal: (state) => {
      state.isVisible = false;
      state.message = '';
      state.type = '';
    },
  }
})

export const { showModal, hideModal } = modalSlice.actions
export default modalSlice.reducer
