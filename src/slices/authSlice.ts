import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GITHUB_TOKEN_KEY } from '../utils/constants';

const authenticate = createAsyncThunk<boolean, string, any>(
  'users/auth',
  async (token: string) => {
    try {
      await AsyncStorage.setItem(GITHUB_TOKEN_KEY, token);
      return true;
    } catch (e) {
      console.error('ERROR:', e);
      return false;
    }
  },
);

const removeToken = createAsyncThunk<boolean, string, any>(
  'users/signout',
  async () => {
    try {
      await AsyncStorage.removeItem(GITHUB_TOKEN_KEY);
      return true;
    } catch (e) {
      console.error('ERROR:', e);
      return false;
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authed: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authenticate.fulfilled, state => {
      state.authed = true;
    });

    builder.addCase(removeToken.rejected, state => {
      state.authed = false;
    });
  },
});

export { authenticate, removeToken, authSlice };
