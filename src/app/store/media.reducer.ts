import { createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie, TvShow } from '@models/index';
import * as MediaActions from '@media-store/media.actions';

export interface MediaState {
  tvShows: TvShow[];
  movies: Movie[];
  selectedMedia: Movie | TvShow | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: MediaState = {
  tvShows: [],
  movies: [],
  selectedMedia: null,
  loading: false,
  error: null
};

export const mediaReducer = createReducer(
  initialState,

  on(MediaActions.fetchMovies, (state) => ({ ...state, loading: true, error: null })),
  on(MediaActions.fetchMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
    loading: false,
    error: null
  })),
  on(MediaActions.fetchMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(MediaActions.fetchTvShows, (state) => ({ ...state, loading: true, error: null })),
  on(MediaActions.fetchTvShowsSuccess, (state, { tvShows }) => ({
    ...state,
    tvShows,
    loading: false,
    error: null
  })),
  on(MediaActions.fetchTvShowsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(MediaActions.selectMediaItem, (state, { mediaItem }) => ({
    ...state,
    selectedMedia: mediaItem
  })),
  on(MediaActions.clearSelectedMediaItem, (state) => ({
    ...state,
    selectedMedia: null
  }))
);
