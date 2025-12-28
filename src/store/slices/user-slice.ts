import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus } from '../../enums/auth-status.enum.js';
import { User } from '../../types/user.type.js';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.js';

type UserState = {
  authStatus: AuthStatus;
  user: User | null;
};

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NotAuth;
        state.user = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NotAuth;
        state.user = null;
      });
  },
});
