import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable, combineLatest, takeUntil } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import * as SearchActions from '@search-store/search.actions';
import { selectSearchTerm } from '@search-store/search.selectors';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchTermUpdated: Subject<string> = new Subject<string>();
  searchTerm$: Observable<string>;
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.searchTerm$ = this.store.pipe(select(selectSearchTerm));
  }

  ngOnInit() {
    combineLatest([
      this.searchTermUpdated.pipe(debounceTime(1000), distinctUntilChanged()),
      this.searchTerm$
    ])
      .pipe(
        filter(
          ([updatedTerm, currentTerm]) =>
            updatedTerm === '' || (updatedTerm.length >= 3 && updatedTerm !== currentTerm)
        ),
        map(([updatedTerm]) => updatedTerm),
        takeUntil(this.destroy$)
      )
      .subscribe((term) => {
        this.store.dispatch(SearchActions.updateSearchTerm({ term }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(term: string) {
    this.searchTermUpdated.next(term);
  }
}
