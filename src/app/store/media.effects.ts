import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as MediaActions from '@media-store/media.actions';
import * as SearchActions from '@search-store/search.actions';
import { selectSearchTerm } from '@search-store/search.selectors';
import { MediaService } from '@services/media.service';
import { MediaType, Movie, TvShow } from '@models/media';

@Injectable()
export class MediaEffects {
  fetchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MediaActions.fetchMovies, SearchActions.updateSearchTerm),
      withLatestFrom(this.store.pipe(select(selectSearchTerm))),
      switchMap(([_, searchTerm]) => {
        if (searchTerm) {
          return this.mediaService.searchItems<Movie>(MediaType.Movie, searchTerm).pipe(
            map((movies) => MediaActions.fetchMoviesSuccess({ movies })),
            catchError((error) => of(MediaActions.fetchMoviesFailure({ error })))
          );
        } else {
          return this.mediaService.getTopItems<Movie>(MediaType.Movie).pipe(
            map((movies) => MediaActions.fetchMoviesSuccess({ movies })),
            catchError((error) => of(MediaActions.fetchMoviesFailure({ error })))
          );
        }
      })
    )
  );

  fetchTvShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MediaActions.fetchTvShows, SearchActions.updateSearchTerm),
      withLatestFrom(this.store.pipe(select(selectSearchTerm))),
      switchMap(([_, searchTerm]) => {
        if (searchTerm) {
          return this.mediaService.searchItems<TvShow>(MediaType.Tv, searchTerm).pipe(
            map((tvShows) => MediaActions.fetchTvShowsSuccess({ tvShows })),
            catchError((error) => of(MediaActions.fetchTvShowsFailure({ error })))
          );
        } else {
          return this.mediaService.getTopItems<TvShow>(MediaType.Tv).pipe(
            map((tvShows) => MediaActions.fetchTvShowsSuccess({ tvShows })),
            catchError((error) => of(MediaActions.fetchTvShowsFailure({ error })))
          );
        }
      })
    )
  );

  fetchMediaItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MediaActions.fetchMediaItemById),
      switchMap(({ id, mediaType }) => {
        return this.mediaService.getItemById(mediaType as MediaType, id).pipe(
          map((mediaItem) => MediaActions.fetchMediaItemByIdSuccess({ mediaItem })),
          catchError((error) => of(MediaActions.fetchMediaItemByIdFailure({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private mediaService: MediaService,
    private store: Store
  ) {}
}
