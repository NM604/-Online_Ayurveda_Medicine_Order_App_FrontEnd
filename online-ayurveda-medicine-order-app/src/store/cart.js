import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      if (state.cartItems.length === 0) {
        state.cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }
      const cartItem = action.payload;
      let isDuplicate = false;
      state.cartItems = state.cartItems.map((item) => {
        if (item.medicineId === cartItem.medicineId) {
          isDuplicate = true;
          const netqty = +item.quantity + +cartItem.quantity;
          item.quantity = netqty;
        }
        return item;
      });
      if (!isDuplicate) {
        state.cartItems.unshift(cartItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem(state, action) {
      if (state.cartItems.length === 0) {
        state.cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }
      const filtered = state.cartItems.filter(
        (item) => item.medicineId != action.payload
      );
      state.cartItems = filtered;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQuantity(state, action) {
      if (state.cartItems.length === 0) {
        state.cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }
      const medicineId = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.medicineId === medicineId) {
          const netqty = +item.quantity + 1;
          item.quantity = netqty;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseQuantity(state, action) {
      if (state.cartItems.length === 0) {
        state.cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }
      console.log("de");
      const medicineId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        if (item.medicineId === medicineId && item.quantity === 1) {
          return false;
        }
        return true;
      });
      state.cartItems = state.cartItems.map((item) => {
        if (item.medicineId === medicineId) {
          const netqty = +item.quantity - 1;
          item.quantity = netqty;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      console.log("cart cleared");
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
