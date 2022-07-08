import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import style from './style.module.scss';

const MoviesTitle: React.FC = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnter = () => {
        setIsHovered(true);
    };

    const onMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className={style.container}>
            <h2>
                <Link href="/#">
                    <a className={style.link} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <div className={style.title}>
                            {children}
                        </div>
                        <AnimatePresence>
                            {
                                isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, left: '-30px' }}
                                        animate={{ opacity: 1, left: 0 }}
                                        exit={{ opacity: 0, left: '-30px' }}
                                        transition={{ duration: 0.2 }}
                                        className={style.explore}
                                    >
                                        Explore All
                                        {' '}
                                        <FaChevronRight className={style.icon} />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </a>
                </Link>
            </h2>
        </div>
    );
};

export default MoviesTitle;