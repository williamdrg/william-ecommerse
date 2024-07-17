import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import urlBase from "../../utils/urlBase";

const productSlice = createSlice({
  name: 'product',
  initialState: {},
  reducers: {
    setProduct: (state, { payload }) => payload
  },
})

export const { setProduct } = productSlice.actions
export default productSlice.reducer

export const getProductThunk = (id) => (dispatch) => {
  axios.get(`${urlBase}/products/${id}`)
    .then((res) => dispatch(setProduct(res.data)))
    .catch(err => console.error(err))
}