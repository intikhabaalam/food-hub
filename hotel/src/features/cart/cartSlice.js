import { createSlice } from "@reduxjs/toolkit";

const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const initialCoupon = JSON.parse(localStorage.getItem("appliedCoupon")) || "";
const initialDiscount = Number(localStorage.getItem("discountPercentage")) || 0;

const initialState = {
  cartItems: initialCartItems,
  appliedCoupon: initialCoupon,
  discountPercentage: initialDiscount,
};

const saveToLocalStorage = (state) => {
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem("appliedCoupon", JSON.stringify(state.appliedCoupon));
  localStorage.setItem("discountPercentage", state.discountPercentage.toString());
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.menuItem === item.menuItem);

      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      saveToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.menuItem !== id);
      saveToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existItem = state.cartItems.find((x) => x.menuItem === id);
      if (existItem) {
        existItem.quantity += 1;
      }
      saveToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existItem = state.cartItems.find((x) => x.menuItem === id);
      if (existItem) {
        if (existItem.quantity > 1) {
          existItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((x) => x.menuItem !== id);
        }
      }
      saveToLocalStorage(state);
    },
    applyCoupon: (state, action) => {
      const coupon = (action.payload || "").toUpperCase();
      if (!coupon) {
        state.appliedCoupon = "";
        state.discountPercentage = 0;
        saveToLocalStorage(state);
        return;
      }
      if (coupon === "FAST20") {
        state.appliedCoupon = coupon;
        state.discountPercentage = 20;
      } else if (coupon === "BURGER50") {
        state.appliedCoupon = coupon;
        state.discountPercentage = 50;
      } else if (coupon === "WELCOME10") {
        state.appliedCoupon = coupon;
        state.discountPercentage = 10;
      } else {
        state.appliedCoupon = "";
        state.discountPercentage = 0;
        saveToLocalStorage(state);
        throw new Error("Invalid Coupon Code");
      }
      saveToLocalStorage(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.appliedCoupon = "";
      state.discountPercentage = 0;
      saveToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  applyCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
