import { createSlice } from '@reduxjs/toolkit';
import { OfferCard } from '../../types/offer-card.type.js';
import { fetchOfferAction, fetchNearbyOffersAction } from '../api-actions.js';

type OfferDetailsState = {
  currentOffer: OfferCard | null;
  nearbyOffers: OfferCard[];
  isOfferLoading: boolean;
  hasOfferError: boolean;
};

const initialState: OfferDetailsState = {
  currentOffer: null,
  nearbyOffers: [],
  isOfferLoading: false,
  hasOfferError: false,
};

export const offerDetailsSlice = createSlice({
  name: 'offerDetails',
  initialState,
  reducers: {
    clearOfferDetails: (state) => {
      state.currentOffer = null;
      state.nearbyOffers = [];
      state.hasOfferError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
        state.hasOfferError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.hasOfferError = true;
        state.currentOffer = null;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearbyOffers = [];
      });
  },
});

export const { clearOfferDetails } = offerDetailsSlice.actions;
