import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bearerToken from "../../utils/bearerToken";
import urlBase from "../../utils/urlBase";
import { getCartProductThunk } from "./cart.slice";
import { setLoading } from "./loader.slice";

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

export const getOrderThunk = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`${urlBase}/orders`, bearerToken());
    dispatch(setOrder(res.data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
}

export const postOrderThunk = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(`${urlBase}/orders`, {}, bearerToken());
    dispatch(addOrder(res.data));
    dispatch(getCartProductThunk());
    return res.data;
  } catch (err) {
    console.error(err);
    throw { message: err.response?.data?.message || 'An unexpected error occurred' };
  } finally {
    dispatch(setLoading(false));
  }
};
