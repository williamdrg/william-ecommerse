import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urlBase from "../../utils/urlBase";
import bearerToken from "../../utils/bearerToken";

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

export const getCartProductThunk = () => (dispatch) => {
  axios.get(`${urlBase}/cart`, bearerToken())
    .then(res => {
      dispatch(setCart(res.data))})
    .catch(err => console.error(err))
}

export const postProductThunk = (data) => (dispatch) => {
  axios.post(`${urlBase}/product_cart`, data, bearerToken())
    .then(() => {
      dispatch(getCartProductThunk())})
    .catch(err => console.error(err))
}

export const deleteProductThunk = (id) => (dispatch) => {
  axios.delete(`${urlBase}/product/${id}`, bearerToken())
    .then(() => {
      dispatch(getCartProductThunk())
    })
    .catch(err => console.error(err))
}

export const updateProductQuantity = (data) => (dispatch) => {
  axios.put(`${urlBase}/product`, data, bearerToken())
      .then(res => {
        dispatch(setCart(res.data.cart));
      })
      .catch(err => console.error(err))
}