import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bearerToken from "../../utils/bearerToken";
import urlBase from "../../utils/urlBase";

const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    setOrder: (state, { payload }) => payload,
    addOrder: (state, { payload }) => [...state, payload]
  }
})

export const { setOrder, addOrder } = orderSlice.actions
export default orderSlice.reducer

export const getOrderThunk = () => (dispatch) => {
  axios.get(`${urlBase}/orders`, bearerToken())
    .then(res => {
      dispatch(setOrder(res.data))})
    .catch(err => console.error(err))
}

export const postOrderThunk = () => (dispatch) => {
  axios.post(`${urlBase}/orders`, {}, bearerToken())
    .then(res => {
      dispatch(addOrder(res.data))})
    .catch(err => console.error(err))
}