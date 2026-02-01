import { configureStore} from "@reduxjs/toolkit";
import cartReducer from '../store/features/cartSlice';
import studentReducer from '../store/features/studentSlice';
import snacksReducer from './features/snacksSlice'
import ordersReducer from './features/ordersSlice'
export const store = configureStore({
  reducer: {
    snacks: snacksReducer,
    cart: cartReducer,
    student: studentReducer,
    orders: ordersReducer,
  }
})
