import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice';
import { authSlice } from './slices/authSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
