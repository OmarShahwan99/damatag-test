import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { productsApi } from "./api/productsApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefault) => getDefault().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
