import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuth = true;
      localStorage.setItem("isLoggedIn", "1");
      localStorage.setItem("cartItems", "[]");
    },
    logout(state) {
      state.isAuth = false;
      localStorage.setItem("isLoggedIn", "0");
      localStorage.removeItem("loggedId");
      localStorage.removeItem("loggedType");
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
