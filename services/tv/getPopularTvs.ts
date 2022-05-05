import axios from 'axios';
import { BASE_API_URL_V3 } from '../../config/urls';
import { API_KEY } from '../../config/env';
import { PopularTvResult, TvListParams, TvQueryFunction } from './types';

const getPopularTvs: TvQueryFunction = async (params: TvListParams) => {
    return axios.get<PopularTvResult>(`${BASE_API_URL_V3}/tv/popular?api_key=${API_KEY}`, { params });
};

export default getPopularTvs;