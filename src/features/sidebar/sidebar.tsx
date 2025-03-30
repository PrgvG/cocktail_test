import { Link, useLocation } from 'react-router-dom';
import styles from './sidebar.module.css';
import { FC } from 'react';

type Props = {
    routes: string[];
};

export const Sidebar: FC<Props> = ({ routes }) => {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <ul>
                {routes.map((cocktail) => {
                    const isActive = location.pathname === `/${cocktail}`;

                    return (
                        <li
                            key={cocktail}
                            className={`${styles.element} ${isActive ? styles.active : ''}`}
                        >
                            <Link
                                key={cocktail}
                                to={'/' + cocktail}
                                className={styles.anchor}
                            >
                                {cocktail}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
