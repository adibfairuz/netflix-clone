import axios from 'axios';
import { BASE_API_URL_V3 } from '~/config/urls';
import { API_KEY } from '~/config/env';
import { MovieListParams, MovieQueryFunction, UpcomingMovieResponse } from './types';

const getUpcomingMovies: MovieQueryFunction = async (params: MovieListParams) => {
    return axios.get<UpcomingMovieResponse>(`${BASE_API_URL_V3}/movie/upcoming?api_key=${API_KEY}`, { params });
};

export default getUpcomingMovies;