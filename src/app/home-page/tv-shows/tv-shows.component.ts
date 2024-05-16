import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import * as MediaActions from '../../store/media.actions';
import { selectTvShows, selectMediaLoading, selectMediaError } from '../../store/media.selectors';
import { TvShow, IMAGE_BASE_URL } from 'src/app/core/models';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  readonly IMAGE_BASE_URL = IMAGE_BASE_URL;
  public tvShows$: Observable<TvShow[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<HttpErrorResponse | null>;

  constructor(private store: Store) {
    this.tvShows$ = this.store.pipe(select(selectTvShows), take(10));
    this.loading$ = this.store.pipe(select(selectMediaLoading));
    this.error$ = this.store.pipe(select(selectMediaError));
  }

  ngOnInit() {
    this.store.dispatch(MediaActions.fetchTvShows());
  }
}
