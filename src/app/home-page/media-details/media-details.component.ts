import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MediaActions from '@media-store/media.actions';
import * as MediaSelectors from '@media-store/media.selectors';
import { Movie, TvShow, IMAGE_BASE_URL, IMAGE_BASE_ORIGINAL_URL } from '@models/index';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss']
})
export class MediaDetailsComponent implements OnInit {
  readonly IMAGE_BASE_URL = IMAGE_BASE_URL;
  readonly IMAGE_BASE_ORIGINAL_URL = IMAGE_BASE_ORIGINAL_URL;
  public selectedMedia$: Observable<Movie | TvShow | null>;
  public loading$: Observable<boolean>;
  public error$: Observable<HttpErrorResponse | null>;
  private mediaType = '';

  constructor(
    private store: Store,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.selectedMedia$ = this.store.pipe(select(MediaSelectors.selectSelectedMediaItem));
    this.loading$ = this.store.pipe(select(MediaSelectors.selectMediaLoading));
    this.error$ = this.store.pipe(select(MediaSelectors.selectMediaError));
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const mediaType = params['mediaType'];
      const id = +params['id'];
      this.store.dispatch(MediaActions.fetchMediaItemById({ id, mediaType }));
    });
  }

  public isMovie(mediaItem: any): mediaItem is Movie {
    return (mediaItem as Movie).title !== undefined;
  }

  public back() {
    this.store.dispatch(MediaActions.clearSelectedMediaItem());
    this.location.back();
  }
}
