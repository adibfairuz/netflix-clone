import React, { useCallback, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import { useQuery } from 'react-query';
import Image from 'next/image';
import useViewport from '~/hooks/useViewport';
import { getPopularMovies } from '~/services/movie';
import { MovieResult, PopularMovieResult } from '~/services/movie/types';
import useRandomNumber from '~/hooks/useRandomNumber';
import { BASE_IMG_URL, PLACEHOLDER_IMG_URL } from '~/config/urls';
import limitText from '~/utils/limitText';
import BannerSkeleton from '~/components/Skeletons/Banner';
import ModalCard from '~/containers/ModalMovieCard';
import style from './style.module.scss';

const Banner: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLoading, data } = useQuery('bannerMovie', () => getPopularMovies({ page: 1 }));
    const randomNumber = useRandomNumber(1, 19);
    const { devices } = useViewport();
    const randomData = data?.data.results[randomNumber] as MovieResult || {};

    const handleCloseModal = useCallback((isOpen: boolean) => {
        setIsModalOpen(isOpen);
    }, []);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    if (devices.desktop) {
        return (
            <div className={style.banner}>
                <div className={style['img-wrapper']}>
                    {
                        isLoading ? (
                            <BannerSkeleton />
                        ) : (
                            <Image
                                width={3840}
                                loader={({
                                    config, src, width, quality,
                                }) => `${config.path}?url=${src}&w=${width}&q=${quality || 100}`}
                                height={2160}
                                placeholder="blur"
                                blurDataURL={PLACEHOLDER_IMG_URL}
                                layout="responsive"
                                className={style.img}
                                src={`${BASE_IMG_URL}original${randomData?.backdrop_path}` || ''}
                            />
                        )
                    }
                    <div className={style['img-vignette-bottom']} />
                    <div className={style['img-vignette-left']} />
                </div>
                <div className={style.content}>
                    <h1 className={style.title}>{randomData?.title}</h1>
                    <span className={style.description}>{limitText(randomData?.overview || '', 176)}</span>
                    <div className={style.buttons}>
                        <button
                            className={style.play}
                            type="button"
                        >
                            <FaPlay
                                className={style.icon}
                            />
                            Play
                        </button>
                        <button
                            onClick={handleOpenModal}
                            className={style['more-info']}
                            type="button"
                        >
                            <MdInfoOutline className={style.icon} />
                            {' '}
                            More Info
                        </button>
                    </div>
                </div>
                <ModalCard
                    animateEnterance
                    data={data?.data.results[randomNumber] as PopularMovieResult || {}}
                    isOpen={isModalOpen}
                    prefix="bannerMovie"
                    onClose={handleCloseModal}
                />
            </div>
        );
    }
    return null;
};

export default Banner;
