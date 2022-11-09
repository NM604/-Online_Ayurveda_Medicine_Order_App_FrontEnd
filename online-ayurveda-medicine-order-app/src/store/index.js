import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import cartReducer from "./cart";
import credReducer from "./cred";
import userReducer from './user';
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    cred: credReducer,
    user:userReducer,
  },
});

export default store;
