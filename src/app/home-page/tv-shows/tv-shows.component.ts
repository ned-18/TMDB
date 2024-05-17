import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MediaActions from '@media-store/media.actions';
import { selectTvShows, selectMediaLoading, selectMediaError } from '@media-store/media.selectors';
import { TvShow, IMAGE_BASE_URL } from '@models/index';

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

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.tvShows$ = this.store.pipe(select(selectTvShows));
    this.loading$ = this.store.pipe(select(selectMediaLoading));
    this.error$ = this.store.pipe(select(selectMediaError));
  }

  ngOnInit() {
    this.store.dispatch(MediaActions.fetchTvShows());
  }

  public onCardClick(mediaItem: TvShow, id: number) {
    this.store.dispatch(MediaActions.selectMediaItem({ mediaItem }));
    this.router.navigate(['/details', id]);
  }
}
