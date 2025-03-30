import { FC } from 'react';
import styles from './message_box.module.css';

type Props = {
    message: string;
};

export const MessageBox: FC<Props> = ({ message }) => {
    return <section className={styles.wrapper}>{message}</section>;
};
