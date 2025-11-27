import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city.type';
import { OfferCard } from '../types/offer-card.type';

export const changeCity = createAction<City>('city/changeCity');
export const loadOffers = createAction<OfferCard[]>('offers/loadOffers');
