import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../redux/slice/userSlice';
import categorySlice from '../redux/slice/categorySlice';
import productSlice from '../redux/slice/productSlice';
import cartSlice from '../redux/slice/cartSlice';

export const store = configureStore({
    reducer: {
      user: userReducer,
      category: categorySlice,
      product: productSlice,
      cart: cartSlice

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          // thunk: {
          //   extraArgument: {
          //     // Add CSRF token handling through headers
          //     getCSRFToken: () => {
          //       // Get CSRF token from meta tag (common pattern)
          //       return document.querySelector('meta[name="csrf-token"]')?.content;
          //     }
          //   }
          // }
        })
});