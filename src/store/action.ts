import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../types/app-route.type';

export const redirectToRoute = createAction<AppRoute>('engine/redirectToRoute');
