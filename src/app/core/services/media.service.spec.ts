import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MediaService } from './media.service';
import { environment } from '@environments/environment';
import { MediaType, Movie, TvShow } from '@models/index';

fdescribe('MediaService', () => {
  let service: MediaService;
  let httpMock: HttpTestingController;

  const API_URL = environment.apiURL;
  const API_KEY = environment.tmdbApiKey;

  const mockMovies: Movie[] = [
    { id: 1, title: 'Movie 1', release_date: '2020-01-01', overview: 'Overview 1', poster_path: '/path1.jpg' } as Movie,
    { id: 2, title: 'Movie 2', release_date: '2020-01-02', overview: 'Overview 2', poster_path: '/path2.jpg' } as Movie,
  ];

  const mockTvShows: TvShow[] = [
    { id: 1, name: 'Show 1', first_air_date: '2020-01-01', overview: 'Overview 1', poster_path: '/path1.jpg' } as TvShow,
    { id: 2, name: 'Show 2', first_air_date: '2020-01-02', overview: 'Overview 2', poster_path: '/path2.jpg' } as TvShow,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MediaService],
    });
    service = TestBed.inject(MediaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTopItems', () => {
    it('should fetch top rated movies', () => {
      service.getTopItems<Movie>(MediaType.Movie).subscribe((movies) => {
        expect(movies.length).toBe(2);
        expect(movies).toEqual(mockMovies);
      });

      const req = httpMock.expectOne(`${API_URL}/movie/top_rated?api_key=${API_KEY}`);
      expect(req.request.method).toBe('GET');
      req.flush({ results: mockMovies });
    });

    it('should fetch top rated tv shows', () => {
      service.getTopItems<TvShow>(MediaType.Tv).subscribe((tvShows) => {
        expect(tvShows.length).toBe(2);
        expect(tvShows).toEqual(mockTvShows);
      });

      const req = httpMock.expectOne(`${API_URL}/tv/top_rated?api_key=${API_KEY}`);
      expect(req.request.method).toBe('GET');
      req.flush({ results: mockTvShows });
    });
  });

  describe('searchItems', () => {
    it('should search movies by term', () => {
      const searchTerm = 'Movie';
      service.searchItems<Movie>(MediaType.Movie, searchTerm).subscribe((movies) => {
        expect(movies.length).toBe(2);
        expect(movies).toEqual(mockMovies);
      });

      const req = httpMock.expectOne(`${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush({ results: mockMovies });
    });

    it('should search tv shows by term', () => {
      const searchTerm = 'Show';
      service.searchItems<TvShow>(MediaType.Tv, searchTerm).subscribe((tvShows) => {
        expect(tvShows.length).toBe(2);
        expect(tvShows).toEqual(mockTvShows);
      });

      const req = httpMock.expectOne(`${API_URL}/search/tv?api_key=${API_KEY}&query=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush({ results: mockTvShows });
    });
  });

  describe('getItemById', () => {
    it('should fetch movie by id', () => {
      const movieId = 1;
      service.getItemById<Movie>(MediaType.Movie, movieId).subscribe((movie) => {
        expect(movie).toEqual(mockMovies[0]);
      });

      const req = httpMock.expectOne(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`);
      expect(req.request.method).toBe('GET');
      req.flush(mockMovies[0]);
    });

    it('should fetch tv show by id', () => {
      const tvShowId = 1;
      service.getItemById<TvShow>(MediaType.Tv, tvShowId).subscribe((tvShow) => {
        expect(tvShow).toEqual(mockTvShows[0]);
      });

      const req = httpMock.expectOne(`${API_URL}/tv/${tvShowId}?api_key=${API_KEY}&append_to_response=videos`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTvShows[0]);
    });
  });
});
