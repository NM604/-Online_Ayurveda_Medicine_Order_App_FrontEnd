import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const cartItem = action.payload;
      state.cartItems.push(cartItem);
    },
    clearCart(state){
      state.cartItems=[];
    }
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
