import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity += 1;
      } else {
        // If not found, add the new item with an initial quantity of 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // Filter out the item based on its name (Task 2, point 2)
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload; // Extract name and amount from payload (Task 2, point 2)
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // Update the item's quantity (Task 2, point 2)
        existingItem.quantity = amount;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;