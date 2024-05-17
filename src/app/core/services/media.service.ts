import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, MediaType, Movie, TvShow } from '@models/index';
import { environment } from '@environments/environment';

const API_URL = environment.apiURL;
const API_KEY = environment.tmdbApiKey;

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) {}

  private buildUrl(endpoint: string, params: { [key: string]: string } = {}): string {
    const queryParams = new URLSearchParams({ api_key: API_KEY, ...params });
    return `${API_URL}/${endpoint}?${queryParams}`;
  }

  private fetchItems<T>(
    endpoint: string,
    params: { [key: string]: string } = {},
    limit = 10
  ): Observable<T[]> {
    const url = this.buildUrl(endpoint, params);
    return this.http
      .get<ApiResponse<T>>(url)
      .pipe(map((response) => response.results.slice(0, limit)));
  }

  private fetchItem<T>(endpoint: string, params: { [key: string]: string } = {}): Observable<T> {
    const url = this.buildUrl(endpoint, params);
    return this.http.get<T>(url);
  }

  getTopItems<T extends Movie | TvShow>(mediaType: MediaType): Observable<T[]> {
    return this.fetchItems<T>(`${mediaType}/top_rated`);
  }

  searchItems<T extends Movie | TvShow>(mediaType: MediaType, searchTerm: string): Observable<T[]> {
    return this.fetchItems<T>(`search/${mediaType}`, { query: searchTerm });
  }

  getItemById<T extends Movie | TvShow>(mediaType: MediaType, id: number): Observable<T> {
    return this.fetchItem<T>(`${mediaType}/${id}`);
  }
}
