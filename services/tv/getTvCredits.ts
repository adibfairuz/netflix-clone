import axios from 'axios';
import { BASE_API_URL_V3 } from '~/config/urls';
import { API_KEY } from '~/config/env';
import { FilmCreditsResponse } from '../types';

const getTvCredits = async (id: number) => {
    return axios.get<FilmCreditsResponse>(`${BASE_API_URL_V3}/tv/${id}/credits?api_key=${API_KEY}`);
};

export default getTvCredits;