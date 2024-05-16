import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MediaState } from './media.reducer';

export const selectMediaState = createFeatureSelector<MediaState>('media');
export const selectMovies = createSelector(selectMediaState, (state) => state.movies);
export const selectTvShows = createSelector(selectMediaState, (state) => state.tvShows);
export const selectSelectedMediaItem = createSelector(
  selectMediaState,
  (state) => state.selectedMedia
);
export const selectMediaLoading = createSelector(selectMediaState, (state) => state.loading);
export const selectMediaError = createSelector(selectMediaState, (state) => state.error);
