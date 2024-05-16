import { createAction, props } from '@ngrx/store';
import { Movie, TvShow } from '../core/models/media';
import { HttpErrorResponse } from '@angular/common/http';

//Fetch Movies
export const fetchMovies = createAction('[Movies] Fetch Movies');
export const fetchMoviesSuccess = createAction(
  '[Media] Fetch Movies Success',
  props<{ movies: Movie[] }>()
);
export const fetchMoviesFailure = createAction(
  '[Media] Fetch Movies Failure',
  props<{ error: HttpErrorResponse }>()
);
//Fetch Tv Shows
export const fetchTvShows = createAction('[Tv Shows] Fetch Tv Shows');
export const fetchTvShowsSuccess = createAction(
  '[Media] Fetch Tv Shows Success',
  props<{ tvShows: TvShow[] }>()
);
export const fetchTvShowsFailure = createAction(
  '[Media] Fetch Tv Shows Failure',
  props<{ error: HttpErrorResponse }>()
);

export const selectMediaItem = createAction(
  '[Media] Select Media Item',
  props<{ mediaItem: Movie | TvShow }>()
);
