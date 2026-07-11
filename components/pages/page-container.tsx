import styles from './page-container.module.css';

export interface PageContainerProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function PageContainerComponent({ title, subtitle, children }: PageContainerProps) {
    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <div className={styles["page-title"]}>
                    <h1>{title}</h1>
                    {subtitle && (
                        <p>
                            {subtitle}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </main>
    );
}
