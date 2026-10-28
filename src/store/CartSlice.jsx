import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    // Add a plant to the cart
    addItem(state, action) {
      const newItem = action.payload;
      const price = Number(newItem.cost ?? newItem.price ?? 0);

      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price,
          cost: price,
          image: newItem.image,
          quantity: 1,
          totalPrice: price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    // Remove a plant completely from the cart
    removeItem(state, action) {
      const id = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      }

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    // Set a plant's quantity
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (item) {
        const newQuantity = Number(quantity);

        if (newQuantity <= 0) {
          state.totalQuantity -= item.quantity;
          state.items = state.items.filter(
            (item) => item.id !== id
          );
        } else if (Number.isInteger(newQuantity)) {
          state.totalQuantity += newQuantity - item.quantity;
          item.quantity = newQuantity;
          item.totalPrice = item.price * item.quantity;
        }
      }

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    // Compatibility with your previous action names
    addToCart(state, action) {
      const newItem = action.payload;
      const price = Number(newItem.cost ?? newItem.price ?? 0);

      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price,
          cost: price,
          image: newItem.image,
          quantity: 1,
          totalPrice: price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find(
        (item) => item.id === id
      );

      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      }

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity += 1;
      }

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
          item.totalPrice = item.price * item.quantity;
        } else {
          state.items = state.items.filter(
            (cartItem) => cartItem.id !== action.payload
          );
          state.totalQuantity -= 1;
        }
      }

      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const cartActions = CartSlice.actions;
export const {
  addItem,
  removeItem,
  updateQuantity,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
