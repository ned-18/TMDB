import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MediaActions from '@media-store/media.actions';
import * as MediaSelectors from '@media-store/media.selectors';
import { Movie, IMAGE_BASE_URL } from '@models/index';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  readonly IMAGE_BASE_URL = IMAGE_BASE_URL;
  public movies$: Observable<Movie[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<HttpErrorResponse | null>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.movies$ = this.store.pipe(select(MediaSelectors.selectMovies));
    this.loading$ = this.store.pipe(select(MediaSelectors.selectMediaLoading));
    this.error$ = this.store.pipe(select(MediaSelectors.selectMediaError));
  }

  ngOnInit() {
    this.store.dispatch(MediaActions.fetchMovies());
  }

  public onCardClick(mediaItem: Movie, id: number) {
    this.store.dispatch(MediaActions.selectMediaItem({ mediaItem }));
    this.router.navigate(['/details', id]);
  }
}
