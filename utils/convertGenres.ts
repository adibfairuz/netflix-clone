import movies from '~/mocks/genres/movies.json';
import series from '~/mocks/genres/series.json';

const moviesGenre: { [key: string]: string } = movies;
const seriesGenre: { [key: string]: string } = series;

type GenreType = 'movies' | 'tvs';

const convertGenres = (genres: number[] = [], type: GenreType) => {
    if (type === 'movies') {
        return genres.map((item) => moviesGenre[item]);
    }
    return genres.map((item) => seriesGenre[item]);
};

export default convertGenres;
