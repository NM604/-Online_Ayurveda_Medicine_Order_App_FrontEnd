import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: false,
};

const authSlice =createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
