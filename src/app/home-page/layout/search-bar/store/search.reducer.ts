import { createReducer, on } from '@ngrx/store';
import { initialSearchState } from './search.state';
import * as SearchActions from './search.actions';

export const searchReducer = createReducer(
  initialSearchState,
  on(SearchActions.updateSearchTerm, (state, { term }) => ({
    ...state,
    term
  }))
);
