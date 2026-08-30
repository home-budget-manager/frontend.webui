import styles from './loader.module.css';

export default function Loader() {
    return (
        <div className={styles.loader} role="status" aria-live="polite" aria-label="Loading">
            <div className={styles.spinner} aria-hidden="true"></div>
        </div>
    );
}