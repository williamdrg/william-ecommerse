import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import toggleCartVisibility from "./slices/isVisibleCart.slice";
import cart from "./slices/cart.slice";
import orderSlice from "./slices/order.slice";
import productSlice from "./slices/product.slice";
import modalSlice from "./slices/modal.slice";



const store = configureStore({
  reducer: {
    authSlice,
    toggleCartVisibility,
    cart,
    order: orderSlice,
    product: productSlice,
    modal: modalSlice  
  }
})

export default store