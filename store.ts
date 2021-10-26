import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './js/counterSlice';

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});
