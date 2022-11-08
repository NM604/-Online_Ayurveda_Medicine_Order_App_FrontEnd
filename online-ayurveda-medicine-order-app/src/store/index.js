import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import cartReducer from "./cart";
import credReducer from "./cred";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    cred: credReducer,
  },
});

export default store;
