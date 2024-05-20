import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { MoviesComponent } from './movies.component';
import { NoResultsComponent } from '@shared/components/no-results/no-results.component';
import { CardComponent } from '@shared/components/card/card.component';
import * as MediaSelectors from '@media-store/media.selectors';
import * as MediaActions from '@media-store/media.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { MediaType, Movie } from '@models/media';

fdescribe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let store: MockStore;
  let router: Router;
  const initialState = {
    movies: [],
    loading: false,
    error: null
  };
   const movies: Movie[] = [
      {
        id: 1, title: 'Movie 1', release_date: '2020-01-01', overview: 'Overview 1', poster_path: '/path1.jpg',
      } as Movie,
      {
        id: 2, title: 'Movie 2', release_date: '2020-01-02', overview: 'Overview 2', poster_path: '/path2.jpg',
      } as Movie
    ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent, MockComponent(CardComponent), MockComponent(NoResultsComponent)],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch fetchMovies action on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(MediaActions.fetchMovies());
  });

  it('should show loading indicator when loading', () => {
    store.overrideSelector(MediaSelectors.selectMediaLoading, true);
    fixture.detectChanges();
    const loadingElement = fixture.debugElement.query(By.css('.loading'));
    expect(loadingElement).toBeTruthy();
  });

  it('should show error component when error', () => {
    const errorResponse = new HttpErrorResponse({ error: 'error', status: 500 });
    store.overrideSelector(MediaSelectors.selectMediaError, errorResponse);
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('app-no-results'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.componentInstance.header).toBe('Oops, something went wrong!');
  });

  it('should show movies when movies are available', () => {
    store.overrideSelector(MediaSelectors.selectMovies, movies);
    store.overrideSelector(MediaSelectors.selectMediaLoading, false);
    store.overrideSelector(MediaSelectors.selectMediaError, null);
    fixture.detectChanges();
    const movieElements = fixture.debugElement.queryAll(By.css('app-card'));
    expect(movieElements.length).toBe(movies.length);
  });

  it('should show no results component when movies are empty', () => {
    store.overrideSelector(MediaSelectors.selectMovies, []);
    store.overrideSelector(MediaSelectors.selectMediaLoading, false);
    store.overrideSelector(MediaSelectors.selectMediaError, null);
    fixture.detectChanges();
    const noResultsElement = fixture.debugElement.query(By.css('app-no-results'));
    expect(noResultsElement).toBeTruthy();
    expect(noResultsElement.componentInstance.header).toBe('No Results Found!');
  });

  it('should navigate to movie details on card click', () => {
    store.overrideSelector(MediaSelectors.selectMovies, [movies[0]]);
    store.overrideSelector(MediaSelectors.selectMediaLoading, false);
    store.overrideSelector(MediaSelectors.selectMediaError, null);
    fixture.detectChanges();
    const movieElement = fixture.debugElement.query(By.css('app-card'));
    movieElement.triggerEventHandler('cardClick', null);
    expect(router.navigate).toHaveBeenCalledWith(['/details', MediaType.Movie, movies[0].id]);
  });
});
