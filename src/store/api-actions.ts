import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import { redirectToRoute } from './action';
import { AppDispatch, State } from '../types/state.type';
import { OfferCard } from '../types/offer-card.type';
import { AppRoute } from '../types/app-route.type';
import { removeToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.type';
import { User } from '../types/user.type';
import { Review } from '../types/review.type';


export const fetchOffersAction = createAsyncThunk<OfferCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferCard[]>(AppRoute.OffersMain);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>(AppRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (payload, {dispatch, extra: api}) => {
    const {data} = await api.post<User>(AppRoute.Login, payload);
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
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
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const fetchOfferAction = createAsyncThunk<OfferCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferCard>(`/offers/${offerId}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<OfferCard[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferCard[]>(`/offers/${offerId}/nearby`);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/fetchComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  },
);

export const postCommentAction = createAsyncThunk<Review[], {offerId: string; comment: string; rating: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/postComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    await api.post(`/comments/${offerId}`, {comment, rating});
    const {data} = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  },
);
