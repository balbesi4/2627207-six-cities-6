import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state.type.js';
import { sortOffersByOption } from '../utils/offer-sort.util.js';

// Base selectors
export const selectCity = (state: State) => state.city.city;
export const selectOffers = (state: State) => state.offers.offers;
export const selectSortType = (state: State) => state.offers.sortType;
export const selectAreOffersLoading = (state: State) => state.offers.areOffersLoading;

export const selectCurrentOffer = (state: State) => state.offerDetails.currentOffer;
export const selectNearbyOffers = (state: State) => state.offerDetails.nearbyOffers;
export const selectIsOfferLoading = (state: State) => state.offerDetails.isOfferLoading;
export const selectHasOfferError = (state: State) => state.offerDetails.hasOfferError;

export const selectReviews = (state: State) => state.reviews.reviews;
export const selectIsSubmitting = (state: State) => state.reviews.isSubmitting;

export const selectAuthStatus = (state: State) => state.user.authStatus;
export const selectUser = (state: State) => state.user.user;

// Memoized selectors
export const selectOffersForCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

export const selectSortedOffers = createSelector(
  [selectOffersForCity, selectSortType],
  (offers, sortType) => sortOffersByOption(offers, sortType)
);

export const selectCityLocation = createSelector(
  [selectCity],
  (city) => city.location
);

export const selectOfferPoints = createSelector(
  [selectOffersForCity],
  (offers) => offers.map((offer) => ({
    id: offer.id,
    location: offer.location
  }))
);

export const selectNearbyOfferPoints = createSelector(
  [selectNearbyOffers],
  (offers) => offers.map((offer) => ({
    id: offer.id,
    location: offer.location
  }))
);

export const selectSortedReviews = createSelector(
  [selectReviews],
  (reviews) => [...reviews].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
);
