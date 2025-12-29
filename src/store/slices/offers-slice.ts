import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferCard } from '../../types/offer-card.type.js';
import { SortType } from '../../enums/sort-options.enum.js';
import { fetchOffersAction, toggleFavoriteAction, fetchFavoritesAction } from '../api-actions.js';

type OffersState = {
  offers: OfferCard[];
  sortType: SortType;
  areOffersLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  sortType: SortType.Popular,
  areOffersLoading: false,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.areOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.areOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.areOffersLoading = false;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex] = updatedOffer;
        }
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        const favoriteOffers = action.payload;
        state.offers = state.offers.map((offer) => ({
          ...offer,
          isFavorite: favoriteOffers.some((favOffer) => favOffer.id === offer.id)
        }));
      });
  },
});

export const { setSortType } = offersSlice.actions;
