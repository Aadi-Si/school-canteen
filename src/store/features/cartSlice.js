import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: {}, 
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateItem(state, action) {
      const { id, item } = action.payload

      if (item.quantity === 0) {
        delete state.items[id]
      } else {
        state.items[id] = item
      }
    },
    clearCart(state) {
      state.items = {}
    },
  },
})

export const { updateItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
