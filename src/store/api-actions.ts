import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

import { setOffersLoadingStatus, loadOffers } from './action';
import { AppDispatch, State } from '../types/state.type';
import { OfferCard } from '../types/offer-card.type';
import { AppRoute } from '../types/app-route.type';


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
