import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urlBase from "../../utils/urlBase";
import bearerToken from "../../utils/bearerToken";
import { setLoading } from "./loader.slice";
import { showModal } from "./modal.slice";

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, { payload }) => payload,
    addCart: (state, { payload }) => [...state, payload],
    deleteCart: (state, { payload }) => state.filter(prod => prod.id !== payload),
    updateCart: (state, { payload }) => {
      const product = state
      if (product) {
        product.quantity = payload.quantity;
      }
    }
  },
})

export const { setCart, addCart, deleteCart, updateCart } = cart.actions
export default cart.reducer

export const getCartProductThunk = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`${urlBase}/cart`, bearerToken());
    dispatch(setCart(res.data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
}


export const postProductThunk = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.post(`${urlBase}/product_cart`, data, bearerToken());
    dispatch(getCartProductThunk());
    dispatch(showModal({ message: 'Product added to cart successfully', type: 'success' }));
    return res.data;
  } catch (err) {
    console.error(err);
    dispatch(showModal({ message: 'Failed to add product to cart', type: 'error' }));
  } finally {
    dispatch(setLoading(false));
  }
}

export const deleteProductThunk = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.delete(`${urlBase}/product/${id}`, bearerToken());
    dispatch(getCartProductThunk());
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
}

export const updateProductQuantity = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.put(`${urlBase}/product`, data, bearerToken());
    dispatch(setCart(res.data.cart));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
}