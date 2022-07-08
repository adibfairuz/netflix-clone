import { NextPage } from 'next';
import Footer from '~/containers/Footer';
import Banner from '~/containers/Banner';
import FilmList from '~/containers/FilmList';
import Header from '~/containers/Header';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '~/services/movie';
import { getTopRatedTvs, getPopularTvs } from '~/services/tv';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Netflix Clone</title>
            </Head>
            <Header />
            <Banner />
            <div style={{ zIndex: 40, position: 'relative' }}>
                <FilmList type="movie" queryKey="popularMovie" queryFn={getPopularMovies} title="Trending Now" />
                <FilmList type="movie" queryKey="topRatedMovie" queryFn={getTopRatedMovies} title="Top Rated" />
                <FilmList type="movie" queryKey="upcomingMovie" queryFn={getUpcomingMovies} title="Upcoming" />
                <FilmList type="tv" queryKey="topRatedTv" queryFn={getTopRatedTvs} title="Top Rated TV" />
                <FilmList type="tv" queryKey="PopularTv" queryFn={getPopularTvs} title="Popular TV" />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
