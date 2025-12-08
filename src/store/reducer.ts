import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, requireAuth, setOffersLoadingStatus, setReviews } from './action.js';
import { City } from '../types/city.type.js';
import { OfferCard } from '../types/offer-card.type.js';
import { SortType } from '../enums/sort-options.enum.js';
import { Review } from '../types/review.type.js';
import { AuthStatus } from '../enums/auth-status.enum.js';

type State = {
  city: City;
  offers: OfferCard[];
  reviews: Review[];
  sortType: SortType;
  areOffersLoading: boolean;
  authStatus: AuthStatus;
};

const initialState: State = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 16,
    }
  },
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
  areOffersLoading: false,
  authStatus: AuthStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.areOffersLoading = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    });
});

export { reducer };
