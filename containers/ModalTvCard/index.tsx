import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaRegThumbsUp } from 'react-icons/fa';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { TvResult } from '~/services/tv/types';
import { BASE_IMG_URL, PLACEHOLDER_IMG_URL } from '~/config/urls';
import convertGenres from '~/utils/convertGenres';
import Modal from '~/components/Modal';
import { getTvCredits } from '~/services/tv';
import style from './style.module.scss';

interface ModalTvCardProps {
    data: TvResult,
    isOpen: boolean,
    onClose: (isOpen: boolean) => void,
    prefix: string,
    animateEnterance?: boolean,
}

const ModalTvCard: React.FC<ModalTvCardProps> = ({
    data, isOpen, onClose, prefix, animateEnterance = false,
}) => {
    const {
        isLoading: isLoadingMovieCredits,
        data: movieCreditsData,
        refetch: refetchMovieCredits,
    } = useQuery(`movieCredits-${data.id}`, () => getTvCredits(data.id), { enabled: false });
    const cast = movieCreditsData?.data.cast || [];

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                refetchMovieCredits();
            }, 500);
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} layoutId={`card-${prefix}-${data.id}`} animateEnterance={animateEnterance}>
            <motion.div
                layoutId={`card-wrapper-img-${prefix}-${data.id}`}
                className={style['wrapper-img']}
            >
                <div className={style['vignette-bottom']} />
                <div className={style['img-vignette-left']} />
                <div className={style.content}>
                    <h1 className={style.title}>{data.name}</h1>
                    <div className={style.buttons}>
                        <button type="button" className={style.play}>
                            <FaPlay className={style.icon} />
                            {' '}
                            Play
                        </button>
                        <div className={style.icons}>
                            <div className={style.icon}>
                                <FaPlus />
                            </div>
                            <div className={style.icon}>
                                <FaRegThumbsUp />
                            </div>
                        </div>
                    </div>
                </div>
                <Image
                    unoptimized
                    placeholder="blur"
                    blurDataURL={PLACEHOLDER_IMG_URL}
                    width={3840}
                    height={2160}
                    className={style.img}
                    src={`${BASE_IMG_URL}w780${data.backdrop_path}`}
                />
            </motion.div>
            <motion.div
                className={style.details}
                animate
            >
                <div className={style.left}>
                    <div className={style['meta-data']}>
                        <div className={style['match-score']}>
                            Match:
                            {' '}
                            {data.vote_average * 10}
                            %
                        </div>
                        {/* <div className={style['maturity-rate']}>
                            {data.adult ? '18+' : 'PG-13'}
                        </div> */}
                        <div className={style['season-total']}>
                            Year:
                            {' '}
                            {data.first_air_date?.split?.('-')?.[0]}
                        </div>
                    </div>
                    <div className={style.description}>
                        {data.overview}
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.credit}>
                        <span className={style.title}>Casts: </span>
                        {
                            !isLoadingMovieCredits && cast.length ? (
                                <>
                                    {cast.filter((item, i) => i < 5).map((item) => (
                                        <span className={style.value} key={item.id}>
                                            {item.name}
                                            ,
                                            {' '}
                                        </span>
                                    ))}
                                    <span className={style.value}>More</span>
                                </>
                            ) : <span className={style.value}>Loading...</span>
                        }
                    </div>
                    <div className={style.credit}>
                        <span className={style.title}>Genres: </span>
                        {
                            convertGenres(data.genre_ids, 'tvs')?.map?.((item) => (
                                <span className={style.value} key={`genre-${item}`}>
                                    {item}
                                    ,
                                    {' '}
                                </span>
                            ))
                        }
                        <span className={style.value}>More</span>
                    </div>
                </div>
            </motion.div>
        </Modal>
    );
};

ModalTvCard.defaultProps = {
    animateEnterance: false,
};

export default ModalTvCard;