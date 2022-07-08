import Link from 'next/link';
import React from 'react';
import style from './style.module.scss';

const Footer: React.FC = () => {
    return (
        <div className={style.footer}>
            <ul className={style.links}>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Audio and Subtitle
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Audio Description
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Help Center
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Media Center
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Investor Relations
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Jobs
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Terms of Use
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Privacy
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Legal Notices
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Cookie Preference
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#">
                        <a className={style.link}>
                            Corporate Information
                        </a>
                    </Link>
                </li>
            </ul>
            <div className={style.copyright}>
                © 2022 Adib Fairuz.
            </div>
        </div>
    );
};

export default Footer;
