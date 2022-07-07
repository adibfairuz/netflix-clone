import React, { useState } from 'react';
import {
    FaPlay, FaPlus, FaRegThumbsUp, FaChevronDown,
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import useViewport from '~/hooks/useViewport';
import { MovieResult } from '~/services/movie/types';
import { BASE_IMG_URL, PLACEHOLDER_IMG_URL } from '~/config/urls';
import convertGenres from '~/utils/convertGenres';
import style from './style.module.scss';

interface CardProps {
    data: MovieResult,
    onClickDetails: (data: MovieResult) => void,
    prefix?: string,
}

const Card: React.FC<CardProps> = React.memo(({ data, onClickDetails, prefix }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { devices } = useViewport();

    const handleMouseEnter = () => {
        if (devices.desktop) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (devices.desktop) {
            setIsHovered(false);
        }
    };

    const handleClick = () => {
        if (!devices.desktop) {
            onClickDetails(data);
        }
    };

    return (
        <div
            className={style.container}
            onClick={handleClick}
            onFocus={handleMouseEnter}
            onMouseOver={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-hidden
        >
            <AnimatePresence exitBeforeEnter>
                {
                    isHovered ? (
                        <motion.div
                            layoutId={`card-${prefix ? `${prefix}-` : ''}${data.id}`}
                            animate={{ scale: 1.18 }}
                            className={style['hovered-card']}
                        >
                            <motion.div
                                className={style['wrapper-img']}
                                layoutId={`card-wrapper-img-${prefix ? `${prefix}-` : ''}${data.id}`}
                            >
                                <Image
                                    unoptimized
                                    placeholder="blur"
                                    blurDataURL={PLACEHOLDER_IMG_URL}
                                    width={3840}
                                    height={2160}
                                    className={style.img}
                                    src={
                                        data.backdrop_path
                                            ? `${BASE_IMG_URL}w780${data.backdrop_path}`
                                            : PLACEHOLDER_IMG_URL
                                    }
                                />
                                <h3 className={style.title}>{data.title}</h3>
                            </motion.div>
                            <motion.div
                                className={style.details}
                                animate
                            >
                                <div className={style.icons}>
                                    <div className={style.left}>
                                        <div className={style.icon}>
                                            <FaPlay />
                                        </div>
                                        <div className={style.icon}>
                                            <FaPlus />
                                        </div>
                                        <div className={style.icon}>
                                            <FaRegThumbsUp />
                                        </div>
                                    </div>
                                    <div className={style.right}>
                                        <div
                                            className={style['details-icon']}
                                            onClick={() => onClickDetails(data)}
                                            aria-hidden="true"
                                            role="button"
                                        >
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                                <div className={style['meta-data']}>
                                    <div className={style['match-score']}>
                                        Match:
                                        {' '}
                                        {data.vote_average * 10}
                                        %
                                    </div>
                                    <div className={style['maturity-rate']}>
                                        {data.adult ? '18+' : 'PG-13'}
                                    </div>
                                    <div className={style['season-total']}>
                                        Year:
                                        {' '}
                                        {data.release_date.split('-')[0]}
                                    </div>
                                </div>
                                <ul className={style.genres}>
                                    {
                                        convertGenres(data.genre_ids, 'movies').map((item) => (
                                            <li className={style.genre} key={`genre-${item}`}>{item}</li>
                                        ))
                                    }
                                </ul>
                            </motion.div>
                        </motion.div>
                    )
                        : (
                            <motion.div layoutId={`card-${prefix ? `${prefix}-` : ''}${data.id}`} className={style.card}>
                                <motion.div
                                    className={style['wrapper-img']}
                                    layoutId={`card-wrapper-img-${prefix ? `${prefix}-` : ''}${data.id}`}
                                >
                                    <Image
                                        unoptimized
                                        placeholder="blur"
                                        blurDataURL={PLACEHOLDER_IMG_URL}
                                        width={3840}
                                        height={2160}
                                        className={style.img}
                                        src={
                                            data.backdrop_path
                                                ? `${BASE_IMG_URL}w780${data.backdrop_path}`
                                                : PLACEHOLDER_IMG_URL
                                        }
                                    />
                                </motion.div>
                            </motion.div>
                        )
                }
            </AnimatePresence>
        </div>
    );
});

export default Card;