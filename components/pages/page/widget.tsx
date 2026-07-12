import styles from './widget.module.css';

interface WidgetProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    onViewAllClick?: () => void;
}

export default function Widget({
    title,
    children,
    className = "",
    onViewAllClick,
}: WidgetProps) {
    return (
        <section className={`${styles.widget} ${className}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {!!onViewAllClick && <a href="#" className={styles.viewAll} onClick={onViewAllClick}>
                    View all
                </a>}
            </div>
            {children}
        </section>
    );
}
