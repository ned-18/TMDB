import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, switchMap, catchError, map, from, of } from 'rxjs';
import * as MediaActions from '@media-store/media.actions';
import * as MediaSelectors from '@media-store/media.selectors';
import {
  Movie,
  TvShow,
  IMAGE_BASE_URL,
  IMAGE_BASE_ORIGINAL_URL,
  VIDEO_BASE_URL
} from '@models/index';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss']
})
export class MediaDetailsComponent implements OnInit {
  readonly IMAGE_BASE_URL = IMAGE_BASE_URL;
  readonly IMAGE_BASE_ORIGINAL_URL = IMAGE_BASE_ORIGINAL_URL;
  readonly VIDEO_BASE_URL = VIDEO_BASE_URL;
  public selectedMedia$: Observable<Movie | TvShow | null>;
  public loading$: Observable<boolean>;
  public error$: Observable<HttpErrorResponse | null>;
  public videoUrl$: Observable<string | null>;
  public videoFailed = false;

  constructor(
    private store: Store,
    private location: Location,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    this.selectedMedia$ = this.store.pipe(select(MediaSelectors.selectSelectedMediaItem));
    this.loading$ = this.store.pipe(select(MediaSelectors.selectMediaLoading));
    this.error$ = this.store.pipe(select(MediaSelectors.selectMediaError));
    this.videoUrl$ = this.selectedMedia$.pipe(
      switchMap((mediaItem) => {
        if (mediaItem?.videos.results.length ?? 0 > 0) {
          const videoKey = mediaItem?.videos.results[0].key;
          const videoUrl = this.VIDEO_BASE_URL.concat(videoKey as string);
          const videoQuery = '?autoplay=1&mute=1&loop=1&controls=0';
          return from(fetch(videoUrl, { method: 'GET', mode: 'no-cors' })).pipe(
            map(() => videoUrl.concat(videoQuery)),
            catchError(() => {
              this.videoFailed = true;
              return of(null);
            })
          );
        } else {
          this.videoFailed = true;
          return of(null);
        }
      })
    );
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
