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
    },
    logout(state) {
      state.isAuth = false;
      localStorage.setItem("isLoggedIn", "0");
      localStorage.removeItem("loggedId");
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
