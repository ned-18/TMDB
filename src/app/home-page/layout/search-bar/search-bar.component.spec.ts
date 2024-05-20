import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { SearchBarComponent } from './search-bar.component';
import { updateSearchTerm } from '@search-store/search.actions';
import { selectSearchTerm } from '@search-store/search.selectors';

fdescribe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let store: MockStore;
  let mockSelectSearchTerm: Subject<string>;

  beforeEach(async () => {
    mockSelectSearchTerm = new Subject<string>();

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchBarComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectSearchTerm, value: mockSelectSearchTerm.asObservable() }]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockSelectSearchTerm.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updateSearchTerm action with valid term', fakeAsync(() => {
    spyOn(store, 'dispatch');
    const term = 'valid term';
    component.onSearchInput(term); 
    tick(1100);
    expect(store.dispatch).toHaveBeenCalledWith(updateSearchTerm({ term }));
  }));

  it('should not dispatch with invalid term', () => {
    spyOn(store, 'dispatch');
    component.onSearchInput('in');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should not dispatch if term is the same', () => {
    spyOn(store, 'dispatch');
    mockSelectSearchTerm.next('same term');
    component.onSearchInput('same term');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should debounce and distinctUntilChanged on search input', fakeAsync(() => {
    spyOn(store, 'dispatch');
    const term = 'debounce test';

    component.onSearchInput(term);
    component.onSearchInput(term);
    component.onSearchInput(term);
    mockSelectSearchTerm.next('test');

    tick(1100);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(updateSearchTerm({ term }));
  }));
});
