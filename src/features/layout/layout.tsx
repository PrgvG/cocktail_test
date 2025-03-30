import { FC, ReactNode } from 'react';
import styles from './layout.module.css';

type Props = {
    sidebarSlot: ReactNode;
    routerSlot: ReactNode;
};

export const Layout: FC<Props> = ({ sidebarSlot, routerSlot }) => {
    return (
        <section className={styles.wrapper}>
            {sidebarSlot}
            {routerSlot}
        </section>
    );
};
