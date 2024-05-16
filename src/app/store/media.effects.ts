import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as MediaActions from '@media-store/media.actions';
import * as SearchActions from '@search-store/search.actions';
import { selectSearchTerm } from '@search-store/search.selectors';
import { MediaService } from '@services/media.service';

@Injectable()
export class MediaEffects {
  fetchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MediaActions.fetchMovies, SearchActions.updateSearchTerm),
      withLatestFrom(this.store.pipe(select(selectSearchTerm))),
      switchMap(([_, searchTerm]) => {
        if (searchTerm) {
          return this.mediaService.searchMovies(searchTerm).pipe(
            map((movies) => MediaActions.fetchMoviesSuccess({ movies })),
            catchError((error) => of(MediaActions.fetchMoviesFailure({ error })))
          );
        } else {
          return this.mediaService.getTopMovies().pipe(
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
          return this.mediaService.searchTvShows(searchTerm).pipe(
            map((tvShows) => MediaActions.fetchTvShowsSuccess({ tvShows })),
            catchError((error) => of(MediaActions.fetchTvShowsFailure({ error })))
          );
        } else {
          return this.mediaService.getTopTvShows().pipe(
            map((tvShows) => MediaActions.fetchTvShowsSuccess({ tvShows })),
            catchError((error) => of(MediaActions.fetchTvShowsFailure({ error })))
          );
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private mediaService: MediaService,
    private store: Store
  ) {}
}
