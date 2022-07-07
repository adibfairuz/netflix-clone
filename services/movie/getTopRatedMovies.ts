import axios from 'axios';
import { BASE_API_URL_V3 } from '~/config/urls';
import { API_KEY } from '~/config/env';
import { MovieListParams, MovieQueryFunction, TopRatedMovieResponse } from './types';

const getTopRatedMovies: MovieQueryFunction = async (params: MovieListParams) => {
    return axios.get<TopRatedMovieResponse>(`${BASE_API_URL_V3}/movie/top_rated?api_key=${API_KEY}`, { params });
};

export default getTopRatedMovies;