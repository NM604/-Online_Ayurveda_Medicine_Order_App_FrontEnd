import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  type: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    login(state, param) {
      state.type = param.payload;
      localStorage.setItem("loggedType", state.type);
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
