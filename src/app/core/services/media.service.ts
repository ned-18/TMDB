import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TvShow, Movie, ApiResponse } from '../models';

const API_URL = environment.apiURL;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) {}

  private fetchItems<T>(endpoint: string, params: { [key: string]: string } = {}): Observable<T[]> {
    const url = `${API_URL}/${endpoint}?api_key=${API_KEY}&${Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`;
    return this.http.get<ApiResponse<T>>(url).pipe(map((response) => response.results));
  }

  getTopMovies(): Observable<Movie[]> {
    return this.fetchItems<Movie>('movie/top_rated');
  }

  searchMovies(searchTerm: string): Observable<Movie[]> {
    return this.fetchItems<Movie>('search/movie', { query: searchTerm });
  }

  getTopTvShows(): Observable<TvShow[]> {
    return this.fetchItems<TvShow>('tv/top_rated');
  }

  searchTvShows(searchTerm: string): Observable<TvShow[]> {
    return this.fetchItems<TvShow>('search/tv', { query: searchTerm });
  }
}
