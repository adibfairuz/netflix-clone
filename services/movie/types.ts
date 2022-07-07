import { AxiosResponse } from 'axios';
import { FilmListResponse } from '../types';

export interface MovieResult {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface PopularMovieResponse extends FilmListResponse<PopularMovieResult> {}

export interface PopularMovieResult extends MovieResult {}

export interface TopRatedMovieResponse extends FilmListResponse<TopRatedMovieResult> {}

export interface TopRatedMovieResult extends MovieResult {}

export interface UpcomingMovieResponse extends FilmListResponse<UpcomingMovieResult> {}

export interface UpcomingMovieResult extends MovieResult {
    Dates: Dates;
}

export interface MovieListParams {
    language?: string;
    page?: number;
    region?: string;
}

export interface TvListParams {
    language?: string;
    page?: number;
}

export type MovieQueryFunction = (params: MovieListParams) => Promise<AxiosResponse<FilmListResponse<MovieResult>, any>>;