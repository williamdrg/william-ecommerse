import { createSlice } from "@reduxjs/toolkit";

const toggleCartVisibility = createSlice({
  name: 'cart',
  initialState: false,
  reducers: {
    setIsCartVisible: (state, action) => action.payload
  }
})

export const { setIsCartVisible } = toggleCartVisibility.actions
export default toggleCartVisibility.reducer