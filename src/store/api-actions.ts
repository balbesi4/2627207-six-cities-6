import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import { setOffersLoadingStatus, loadOffers, requireAuth, redirectToRoute, setReviews, setCurrentOffer, setNearbyOffers, setOfferLoadingStatus, setOfferError } from './action';
import { AppDispatch, State } from '../types/state.type';
import { OfferCard } from '../types/offer-card.type';
import { AppRoute } from '../types/app-route.type';
import { AuthStatus } from '../enums/auth-status.enum';
import { removeToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.type';
import { User } from '../types/user.type';
import { Review } from '../types/review.type';


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

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOfferLoadingStatus(true));
    dispatch(setOfferError(false));
    try {
      const {data} = await api.get<OfferCard>(`/offers/${offerId}`);
      dispatch(setCurrentOffer(data));
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {response?: {status: number}};
        if (axiosError.response?.status === 404) {
          dispatch(setOfferError(true));
        }
      }
    } finally {
      dispatch(setOfferLoadingStatus(false));
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<OfferCard[]>(`/offers/${offerId}/nearby`);
      dispatch(setNearbyOffers(data));
    } catch {
      dispatch(setNearbyOffers([]));
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/fetchComments',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(`/comments/${offerId}`);
      dispatch(setReviews(data));
    } catch {
      dispatch(setReviews([]));
    }
  },
);

export const postCommentAction = createAsyncThunk<void, {offerId: string; comment: string; rating: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/postComment',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    await api.post(`/comments/${offerId}`, {comment, rating});
    const {data} = await api.get<Review[]>(`/comments/${offerId}`);
    dispatch(setReviews(data));
  },
);
