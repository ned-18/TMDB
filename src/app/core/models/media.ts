interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
}

interface MediaItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: Video[];
  };
}

export interface TvShow extends MediaItem {
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
}

export interface Movie extends MediaItem {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
}

export interface ApiResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv'
}
