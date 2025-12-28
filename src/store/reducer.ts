import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, requireAuth, setOffersLoadingStatus, setReviews, setCurrentOffer, setNearbyOffers, setOfferLoadingStatus, setOfferError } from './action.js';
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
  currentOffer: OfferCard | null;
  nearbyOffers: OfferCard[];
  isOfferLoading: boolean;
  hasOfferError: boolean;
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
  currentOffer: null,
  nearbyOffers: [],
  isOfferLoading: false,
  hasOfferError: false,
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
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setOfferError, (state, action) => {
      state.hasOfferError = action.payload;
    });
});

export { reducer };
