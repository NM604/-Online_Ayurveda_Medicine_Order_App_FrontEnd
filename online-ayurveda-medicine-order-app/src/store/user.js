import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  type: 'admin',
};

const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.type = 'admin';
      //localStorage.setItem("isLoggedIn", "1");
    },
    logout(state) {
        state.type = 'admin';
      //localStorage.setItem("isLoggedIn", "0");
      //localStorage.removeItem("loggedId");
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
