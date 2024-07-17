import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import toggleCartVisibility from "./slices/isVisibleCart.slice";
import cart from "./slices/cart.slice";
import orderSlice from "./slices/order.slice";
import productSlice from "./slices/product.slice";



const store = configureStore({
  reducer: {
    authSlice,
    toggleCartVisibility,
    cart,
    order: orderSlice,
    product: productSlice  
  }
})

export default store