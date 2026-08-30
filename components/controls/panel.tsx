import styles from './panel.module.css';

interface PanelProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    onViewAllClick?: () => void;
}

export default function Panel({
    title,
    children,
    className = "",
    onViewAllClick,
}: PanelProps) {
    const showHeader = !!title || !!onViewAllClick;
    return (
        <section className={`${styles.widget} ${className}`}>
            {showHeader && (
                <div className={styles.header}>
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {!!onViewAllClick && (
                        <button type="button" className={styles.viewAll} onClick={onViewAllClick}>
                            View all
                        </button>
                    )}
                </div>
            )}
            {children}
        </section>
    );
}
