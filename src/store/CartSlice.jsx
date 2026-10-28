import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotal = (items) =>
  items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const CartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      const price = Number(plant.cost ?? plant.price ?? 0);

      const existingItem = state.items.find(
        (item) => item.id === plant.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: plant.id,
          name: plant.name,
          price,
          cost: price,
          image: plant.image,
          quantity: 1,
          totalPrice: price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount = calculateTotal(state.items);
    },

    removeItem(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      }

      state.totalAmount = calculateTotal(state.items);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      const newQuantity = Number(quantity);

      if (!item || !Number.isInteger(newQuantity)) {
        return;
      }

      if (newQuantity <= 0) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      } else {
        state.totalQuantity += newQuantity - item.quantity;
        item.quantity = newQuantity;
        item.totalPrice = item.price * item.quantity;
      }

      state.totalAmount = calculateTotal(state.items);
    },

    // Backward-compatible actions for existing components
    addToCart(state, action) {
      const plant = action.payload;
      const price = Number(plant.cost ?? plant.price ?? 0);
      const existingItem = state.items.find(
        (item) => item.id === plant.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: plant.id,
          name: plant.name,
          price,
          cost: price,
          image: plant.image,
          quantity: 1,
          totalPrice: price,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount = calculateTotal(state.items);
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.items = state.items.filter(
          (item) => item.id !== id
        );
      }

      state.totalAmount = calculateTotal(state.items);
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

      state.totalAmount = calculateTotal(state.items);
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        state.totalQuantity -= 1;

        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice = item.price * item.quantity;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }

      state.totalAmount = calculateTotal(state.items);
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
