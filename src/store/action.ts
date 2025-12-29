import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../types/app-route.type';
import { City } from '../types/city.type';
import { OfferCard } from '../types/offer-card.type';
import { Review } from '../types/review.type';
import { AuthStatus } from '../enums/auth-status.enum';

export const redirectToRoute = createAction<AppRoute>('engine/redirectToRoute');
export const changeCity = createAction<City>('app/changeCity');
export const loadOffers = createAction<OfferCard[]>('data/loadOffers');
export const requireAuth = createAction<AuthStatus>('user/requireAuth');
export const setOffersLoadingStatus = createAction<boolean>('data/setOffersLoadingStatus');
export const setReviews = createAction<Review[]>('data/setReviews');
export const setCurrentOffer = createAction<OfferCard | null>('data/setCurrentOffer');
export const setNearbyOffers = createAction<OfferCard[]>('data/setNearbyOffers');
export const setOfferLoadingStatus = createAction<boolean>('data/setOfferLoadingStatus');
export const setOfferError = createAction<boolean>('data/setOfferError');

