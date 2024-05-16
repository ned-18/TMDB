import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import * as SearchActions from './store/search.actions';
import { selectSearchTerm } from './store/search.selectors';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  searchTerm$!: Observable<string>;
  private searchTermUpdated: Subject<string> = new Subject<string>();

  constructor(private store: Store) {}

  ngOnInit() {
    this.searchTerm$ = this.store.pipe(select(selectSearchTerm));

    combineLatest([
      this.searchTermUpdated.pipe(debounceTime(1000), distinctUntilChanged()),
      this.searchTerm$
    ])
      .pipe(
        filter(
          ([updatedTerm, currentTerm]) =>
            updatedTerm === '' || (updatedTerm.length >= 3 && updatedTerm !== currentTerm)
        ),
        map(([updatedTerm]) => updatedTerm)
      )
      .subscribe((term) => {
        this.store.dispatch(SearchActions.updateSearchTerm({ term }));
      });
  }

  onSearchInput(term: string) {
    this.searchTermUpdated.next(term);
  }
}
