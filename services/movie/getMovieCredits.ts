import axios from 'axios';
import { BASE_API_URL_V3 } from '../../config/urls';
import { API_KEY } from '../../config/env';
import { FilmCreditsResponse } from '../types';

const getMovieCredits = async (id: number) => {
    return axios.get<FilmCreditsResponse>(`${BASE_API_URL_V3}/movie/${id}/credits?api_key=${API_KEY}`);
};

export default getMovieCredits;