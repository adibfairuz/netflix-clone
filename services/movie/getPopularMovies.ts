import axios from 'axios';
import { BASE_API_URL_V3 } from '../../config/urls';
import { API_KEY } from '../../config/env';
import { MovieListParams, MovieQueryFunction, PopularMovieResponse } from './types';

const getPopularMovies: MovieQueryFunction = async (params: MovieListParams) => {
    return axios.get<PopularMovieResponse>(`${BASE_API_URL_V3}/movie/popular?api_key=${API_KEY}`, { params });
};

export default getPopularMovies;