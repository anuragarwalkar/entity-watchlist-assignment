import { configureStore } from '@reduxjs/toolkit'
import stocksSlice from './slice/stocksSlice'

export const store = configureStore({
  reducer: {
    stocks: stocksSlice
  },
})