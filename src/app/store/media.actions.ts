import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie, TvShow } from '@models/index';

//Fetch Movies
export const fetchMovies = createAction('[Media] Fetch Movies');
export const fetchMoviesSuccess = createAction(
  '[Media] Fetch Movies Success',
  props<{ movies: Movie[] }>()
);
export const fetchMoviesFailure = createAction(
  '[Media] Fetch Movies Failure',
  props<{ error: HttpErrorResponse }>()
);
//Fetch Tv Shows
export const fetchTvShows = createAction('[Media] Fetch Tv Shows');
export const fetchTvShowsSuccess = createAction(
  '[Media] Fetch Tv Shows Success',
  props<{ tvShows: TvShow[] }>()
);
export const fetchTvShowsFailure = createAction(
  '[Media] Fetch Tv Shows Failure',
  props<{ error: HttpErrorResponse }>()
);
//Fetch specific item
export const selectMediaItem = createAction(
  '[Media] Select Media Item',
  props<{ mediaItem: Movie | TvShow }>()
);
export const clearSelectedMediaItem = createAction('[Media] Clear Media Item');
