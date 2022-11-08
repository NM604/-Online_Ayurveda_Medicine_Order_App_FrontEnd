import { createSlice } from "@reduxjs/toolkit";

const initialCred = {
  userId: 0,
};

const credSlice = createSlice({
  name: "cred",
  initialState: initialCred,
  reducers: {
    save: (state, param) => {
      state.userId = param.payload;
      console.log(state.userId);
    },
  },
});

const { actions, reducer } = credSlice;
export const { save } = actions;
export default reducer;
