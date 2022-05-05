import React from 'react';
import style from './style.module.scss';

const Footer: React.FC = () => {
    return (
        <div className={style.footer}>
            <ul className={style.links}>
                <li>
                    <a href="/#" className={style.link}>
                        Audio and Subtitle
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Audio Description
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Help Center
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Media Center
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Investor Relations
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Jobs
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Terms of Use
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Privacy
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Legal Notices
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Cookie Preference
                    </a>
                </li>
                <li>
                    <a href="/#" className={style.link}>
                        Corporate Information
                    </a>
                </li>
            </ul>
            <div className={style.copyright}>
                © 2022 Adib Fairuz.
            </div>
        </div>
    );
};

export default Footer;
