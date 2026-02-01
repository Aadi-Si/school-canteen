import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (order) => {
    const res = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })

    if (!res.ok) {
      throw new Error('Failed to place order')
    }

    return res.json()
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    status: 'idle'
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(placeOrder.pending, state => {
        state.status = 'loading'
      })
      .addCase(placeOrder.fulfilled, state => {
        state.status = 'succeeded'
      })
      .addCase(placeOrder.rejected, state => {
        state.status = 'failed'
      })
  }
})

export default ordersSlice.reducer
