import React, {
    useCallback, useEffect, useRef, useState,
} from 'react';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types';
import SwiperCore, { Navigation } from 'swiper';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import useViewport from '~/hooks/useViewport';
import MoviesTitle from '../../components/MoviesTitle';
import style from './style.module.scss';
import { MovieCard, TvCard } from '../../components/Card';
import { MovieQueryFunction, MovieResult } from '../../services/movie/types';
import ListSkeleton from '../../components/Skeletons/List';
import ModalMovieCard from '../ModalMovieCard';
import { TvQueryFunction, TvResult } from '../../services/tv/types';
import ModalTvCard from '../ModalTvCard';

SwiperCore.use([Navigation]);

interface FilmListProps {
    queryKey: string;
    queryFn: MovieQueryFunction | TvQueryFunction;
    title: string;
    type: 'movie' | 'tv';
}

interface MovieListProps extends FilmListProps {
    queryFn: MovieQueryFunction;
    type: 'movie';
}

interface TvListProps extends FilmListProps {
    queryFn: TvQueryFunction;
    type: 'tv'
}

const FilmList: React.FC<MovieListProps | TvListProps> = ({
    queryKey, queryFn, title, type,
}) => {
    const [navigationsAreActive, setNavigationsAreActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<MovieResult | TvResult | {}>({});
    const navigationNextRef = useRef<HTMLDivElement>(null);
    const navigationPrevRef = useRef<HTMLDivElement>(null);
    const { sizes, devices } = useViewport();

    const {
        isLoading: isLoadingMovie,
        data: dataMovie,
        refetch: refetchMovie,
    } = useQuery(
        queryKey,
        () => queryFn({ page: 1 }) as ReturnType<MovieQueryFunction>,
        { enabled: false },
    );
    const {
        data: dataTv,
        refetch: refetchTv,
    } = useQuery(
        queryKey,
        () => queryFn({ page: 1 }) as ReturnType<TvQueryFunction>,
        { enabled: false },
    );

    useEffect(() => {
        if (type === 'movie') {
            refetchMovie();
        } else {
            refetchTv();
        }
    }, []);

    const swiperProps: SwiperProps = {
        allowTouchMove: true,
        spaceBetween: 10,
        slidesPerView: 6.1,
        slidesPerGroup: 6,
        navigation: {
            nextEl: navigationNextRef.current,
            prevEl: navigationPrevRef.current,
        },
        onBeforeInit: (swiper) => {
            const navigationOptions = swiper.params.navigation as NavigationOptions;
            navigationOptions.prevEl = navigationPrevRef.current;
            navigationOptions.nextEl = navigationNextRef.current;
        },
        hidden: false,
        breakpoints: {
            1400: { slidesPerView: 6.1, slidesPerGroup: 6 },
            1200: { slidesPerView: 5.1, slidesPerGroup: 5 },
            992: { slidesPerView: 4.1, slidesPerGroup: 4 },
            768: { slidesPerView: 3.1, slidesPerGroup: 3 },
            576: { slidesPerView: 2.1, slidesPerGroup: 2 },
            0: { slidesPerView: 1.1, slidesPerGroup: 1 },
        },
    };

    const onMouseOver = () => {
        setNavigationsAreActive(true);
    };

    const onMouseLeave = () => {
        setNavigationsAreActive(false);
    };

    const onCloseModal = useCallback((isOpen: boolean) => {
        setIsModalOpen(isOpen);
    }, []);

    const onClickDetails = useCallback((data: MovieResult | TvResult) => {
        setSelectedData(data);
        setIsModalOpen(true);
    }, []);

    return (
        <div className={style.container}>
            <MoviesTitle>{title}</MoviesTitle>
            {
                isLoadingMovie ? (
                    <ListSkeleton total={
                        sizes.xxl ? 6
                            : sizes.xl ? 5
                                : sizes.lg ? 4
                                    : sizes.md ? 3
                                        : sizes.sm ? 2
                                            : 1
                    }
                    />
                )
                    : (
                        <div
                            className={style.slider}
                            onMouseLeave={onMouseLeave}
                            onFocus={onMouseOver}
                            onMouseOver={onMouseOver}
                        >
                            <Swiper
                                className={style.swiper}
                                {...swiperProps}
                            >
                                {
                                    (dataMovie || dataTv)?.data.results.map((film) => (
                                        <SwiperSlide key={film.id} className={style['swiper-slide']}>
                                            {
                                                type === 'movie' ? (
                                                    <MovieCard
                                                        prefix={queryKey}
                                                        data={film as MovieResult}
                                                        onClickDetails={onClickDetails}
                                                    />
                                                ) : (
                                                    <TvCard
                                                        prefix={queryKey}
                                                        data={film as TvResult}
                                                        onClickDetails={onClickDetails}
                                                    />
                                                )
                                            }
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            {
                                devices.desktop && (
                                    <>
                                        <div
                                            style={{
                                                background: navigationsAreActive ? 'rgba(20,20,20,.5)' : 'transparent',
                                            }}
                                            className={style.prev}
                                            ref={navigationPrevRef}
                                        >
                                            {
                                                navigationsAreActive && (
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                                        transition={{ duration: 0.2, delay: 0.15 }}
                                                    >
                                                        <IoChevronBack />
                                                    </motion.span>
                                                )
                                            }
                                        </div>
                                        <div
                                            style={{
                                                background: navigationsAreActive ? 'rgba(20,20,20,.5)' : 'transparent',
                                            }}
                                            className={style.next}
                                            ref={navigationNextRef}
                                        >
                                            {
                                                navigationsAreActive && (
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                                        transition={{ duration: 0.2, delay: 0.15 }}
                                                    >
                                                        <IoChevronForward />
                                                    </motion.span>
                                                )
                                            }
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )
            }
            {
                type === 'movie' ? (
                    <ModalMovieCard
                        isOpen={isModalOpen}
                        onClose={onCloseModal}
                        data={selectedData as MovieResult}
                        prefix={queryKey}
                    />
                ) : (
                    <ModalTvCard
                        isOpen={isModalOpen}
                        onClose={onCloseModal}
                        data={selectedData as TvResult}
                        prefix={queryKey}
                    />
                )
            }
        </div>
    );
};

export default FilmList;