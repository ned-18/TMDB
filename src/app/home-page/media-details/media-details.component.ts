import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as MediaActions from '@media-store/media.actions';
import { selectSelectedMediaItem } from '@media-store/media.selectors';
import { Movie, TvShow, IMAGE_BASE_URL } from '@models/index';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss']
})
export class MediaDetailsComponent implements OnInit, OnDestroy {
  readonly IMAGE_BASE_URL = IMAGE_BASE_URL;
  public selectedMedia$: Observable<Movie | TvShow | null>;
  public mediaItem: Movie | TvShow | null = null;
  private subscription!: Subscription;

  constructor(
    private store: Store,
    private location: Location
  ) {
    this.selectedMedia$ = this.store.pipe(select(selectSelectedMediaItem));
  }

  ngOnInit() {
    this.subscription = this.selectedMedia$.subscribe((mediaItem) => {
      this.mediaItem = mediaItem;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public isMovie(mediaItem: any): mediaItem is Movie {
    return (mediaItem as Movie).title !== undefined;
  }

  public back() {
    this.store.dispatch(MediaActions.clearSelectedMediaItem());
    this.location.back();
  }
}
