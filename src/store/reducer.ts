import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from './action.js';
import { City } from '../types/city.type.js';
import { OfferCard } from '../types/offer-card.type.js';
import { SortType } from '../enums/sort-options.enum.js';

type State = {
  city: City;
  offers: OfferCard[];
  sortType: SortType;
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
  sortType: SortType.Popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
