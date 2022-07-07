import axios from 'axios';
import { BASE_API_URL_V3 } from '~/config/urls';
import { API_KEY } from '~/config/env';
import { TopRatedTvResult, TvListParams, TvQueryFunction } from './types';

const getTopRatedTvs: TvQueryFunction = async (params: TvListParams) => {
    return axios.get<TopRatedTvResult>(`${BASE_API_URL_V3}/tv/top_rated?api_key=${API_KEY}`, { params });
};

export default getTopRatedTvs;