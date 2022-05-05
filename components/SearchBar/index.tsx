import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import style from './style.module.scss';

const SearchBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useOnClickOutside(inputRef, () => setIsOpen(false), !isOpen);

    const handleShowSearchInput = (e: React.MouseEvent<SVGElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className={style.container}>
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.input
                            ref={inputRef}
                            initial={{
                                width: 0,
                                opacity: 0,
                            }}
                            animate={{
                                width: '100%',
                                opacity: 1,
                            }}
                            exit={{
                                width: 0,
                                opacity: 0,
                            }}
                            placeholder="Search titles, people"
                            className={style.input}
                        />
                    )
                }
            </AnimatePresence>
            <BiSearch className={style.icon} size={24} onClick={handleShowSearchInput} />
        </div>
    );
};

export default SearchBar;