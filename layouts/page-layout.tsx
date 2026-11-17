import styles from './page-layout.module.scss';

export interface PageLayoutProps {
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export default function PageLayout({ icon, title, subtitle, children }: PageLayoutProps) {
    return (
        <div className={styles.content}>
            <h1>{icon}{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            {children}
        </div>
    );
}