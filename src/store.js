import { configureStore } from '@reduxjs/toolkit';
import stocksSlice from './slice/stocksSlice';
import utilSlice from './slice/utilSlice';

export const store = configureStore({
  reducer: {
    stocks: stocksSlice,
    utils: utilSlice
  },
})