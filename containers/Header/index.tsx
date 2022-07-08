import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '~/components/SearchBar';
import { FaBell } from 'react-icons/fa';
import useViewport from '~/hooks/useViewport';
import { FiMenu } from 'react-icons/fi';
import NetflixLogo from '~/assets/images/netflix-logo.png';
import style from './style.module.scss';

const Header: React.FC = () => {
    const [isOnTop, setIsOnTop] = useState(true);
    const { devices } = useViewport();

    useEffect(() => {
        const header = document.querySelector('#header') as HTMLHeadElement;
        const headerHeight = header.offsetHeight;
        const headerTop = header.offsetTop;
        const headerBottom = headerTop + headerHeight;
        const scrollListener = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > headerBottom) {
                setIsOnTop(false);
            } else {
                setIsOnTop(true);
            }
        };
        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, []);

    return (
        <header className={style.container}>
            <div id="header" className={[style.header, ...(!isOnTop || !devices.desktop ? [style.sticky] : [])].join(' ')}>
                <div className={style.navbar}>
                    <div className={style.left}>
                        {
                            !devices.desktop && (
                                <FiMenu size={28} className={style.hamburger} />
                            )
                        }
                        <Link href="/#">
                            <a className={style.logo}>
                                <Image width={92} height={31} src={NetflixLogo} />
                            </a>
                        </Link>
                        {
                            devices.desktop && (
                                <>
                                    <Link href="/#">
                                        <a className={style.menu}>Home</a>
                                    </Link>
                                    <Link href="/#">
                                        <a className={style.menu}>TV Shows</a>
                                    </Link>
                                    <Link href="/#">
                                        <a className={style.menu}>Movies</a>
                                    </Link>
                                    <Link href="/#">
                                        <a className={style.menu}>New & Popular</a>
                                    </Link>
                                    <Link href="/#">
                                        <a className={style.menu}>My List</a>
                                    </Link>
                                </>
                            )
                        }
                    </div>
                    <div className={style.right}>
                        <div className={style.item}>
                            <SearchBar />
                        </div>
                        <div className={style.item}>
                            <FaBell size={22} color="white" />
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
