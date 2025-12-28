import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from '../middlewares/redirect.middleware';
import { citySlice } from './slices/city-slice';
import { offersSlice } from './slices/offers-slice';
import { offerDetailsSlice } from './slices/offer-details-slice';
import { reviewsSlice } from './slices/reviews-slice';
import { userSlice } from './slices/user-slice';

export const api = createAPI();

const rootReducer = combineReducers({
  city: citySlice.reducer,
  offers: offersSlice.reducer,
  offerDetails: offerDetailsSlice.reducer,
  reviews: reviewsSlice.reducer,
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
