import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../types/city.type.js';

type CityState = {
  city: City;
};

const initialState: CityState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 16,
    }
  },
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
  },
});

export const { changeCity } = citySlice.actions;
