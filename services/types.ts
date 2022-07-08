export interface FilmListResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

export interface FilmCreditsResponse {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

export default interface Genre {
    id: number;
    name: string;
}