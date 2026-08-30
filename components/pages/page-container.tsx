import Link from "next/link";

import { ChevronLeft } from 'lucide-react';

import styles from './page-container.module.css';

export interface PageContainerProps {
    title: string;
    backlink?: string;
    backlinkLabel?: string;
    subtitle?: string;
    contentContainerClass?: string;
    children: React.ReactNode;
}

export default function PageContainerComponent({ title, backlink, backlinkLabel, subtitle, contentContainerClass, children }: PageContainerProps) {
    const backLinkLabelText = backlinkLabel ?? "Back to previous page";
    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <div className={styles["page-title"]}>
                    <h1>
                        {backlink && (
                            <Link href={backlink} aria-label={backLinkLabelText} title={backLinkLabelText} className={styles["back-link"]}>
                                <ChevronLeft />
                            </Link>
                        )}
                        {title}
                    </h1>
                    {subtitle && (
                        <p>
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className={contentContainerClass}>
                    {children}
                </div>
            </div>
        </main>
    );
}
