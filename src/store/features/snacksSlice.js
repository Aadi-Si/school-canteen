import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchSnacks = createAsyncThunk(
  'snacks/fetchSnacks',
  async () => {
    const res = await fetch('http://localhost:3000/snacks')

    if (!res.ok) {
      throw new Error('Failed to fetch snacks')
    }

    return res.json()
  }
)


export const incrementSnackOrders = createAsyncThunk(
  'snacks/incrementSnackOrders',
  async (snack) => {
    const updatedSnack = {
      ...snack,
      ordersCount: snack.ordersCount + 1
    }

    const res = await fetch(
      `http://localhost:3000/snacks/${snack.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSnack)
      }
    )

    if (!res.ok) {
      throw new Error('Failed to update snack ordersCount')
    }

    return res.json()
  }
)


const snacksSlice = createSlice({
  name: 'snacks',
  initialState: {
    items: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: builder => {
    builder

      
      .addCase(fetchSnacks.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchSnacks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchSnacks.rejected, state => {
        state.status = 'failed'
      })

      
      .addCase(incrementSnackOrders.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          snack => snack.id === action.payload.id
        )

        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
  }
})

export default snacksSlice.reducer
