import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/review.type.js';
import { fetchCommentsAction, postCommentAction } from '../api-actions.js';

type ReviewsState = {
  reviews: Review[];
  isSubmitting: boolean;
};

const initialState: ReviewsState = {
  reviews: [],
  isSubmitting: false,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.reviews = [];
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isSubmitting = false;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isSubmitting = false;
      });
  },
});

export const { clearReviews } = reviewsSlice.actions;
