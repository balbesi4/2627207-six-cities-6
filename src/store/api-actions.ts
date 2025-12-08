import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import { setOffersLoadingStatus, loadOffers, requireAuth, redirectToRoute } from './action';
import { AppDispatch, State } from '../types/state.type';
import { OfferCard } from '../types/offer-card.type';
import { AppRoute } from '../types/app-route.type';
import { AuthStatus } from '../enums/auth-status.enum';
import { removeToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.type';
import { User } from '../types/user.type';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<OfferCard[]>(AppRoute.OffersMain);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(AppRoute.Login);
      dispatch(requireAuth(AuthStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthStatus.NotAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (payload, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<User>(AppRoute.Login, payload);
    saveToken(token);
    dispatch(requireAuth(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(AppRoute.Logout);
    removeToken();
    dispatch(requireAuth(AuthStatus.NotAuth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);
