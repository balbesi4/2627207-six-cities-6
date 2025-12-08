import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city.type';
import { OfferCard } from '../types/offer-card.type';
import { SortType } from '../enums/sort-options.enum';
import { Review } from '../types/review.type';
import { AuthStatus } from '../enums/auth-status.enum';
import { AppRoute } from '../types/app-route.type';

export const changeCity = createAction<City>('city/changeCity');
export const loadOffers = createAction<OfferCard[]>('offers/loadOffers');
export const setSortType = createAction<SortType>('sort/setSortType');
export const setReviews = createAction<Review[]>('reviews/setReviews');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const requireAuth = createAction<AuthStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('engine/redirectToRoute');
