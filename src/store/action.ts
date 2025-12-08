import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city.type';
import { OfferCard } from '../types/offer-card.type';
import { SortType } from '../enums/sort-options.enum';
import { Review } from '../types/review.type';

export const changeCity = createAction<City>('city/changeCity');
export const loadOffers = createAction<OfferCard[]>('offers/loadOffers');
export const setSortType = createAction<SortType>('sort/setSortType');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
