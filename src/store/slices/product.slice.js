import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urlBase from "../../utils/urlBase";
import { setLoading } from "./loader.slice";

const productSlice = createSlice({
  name: 'product',
  initialState: {},
  reducers: {
    setProduct: (state, { payload }) => payload
  },
})

export const { setProduct } = productSlice.actions
export default productSlice.reducer

export const getProductThunk = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`${urlBase}/products/${id}`);
    dispatch(setProduct(res.data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
}