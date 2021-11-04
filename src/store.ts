import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
