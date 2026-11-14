import Link from "next/link";
import type { ComponentType } from "react";

import styles from "./navigation-item.module.scss";

interface NavigationItemProps {
    icon: ComponentType;
    title?: string;
    link: string;
    isExpanded: boolean;
    onClick?: () => void;
    hasBackground?: boolean;
    className?: string;
}

export default function NavigationItem({ title, link, icon: Icon, isExpanded, onClick, hasBackground, className }: NavigationItemProps) {
    const effectiveHasBackground = hasBackground ?? true;
    const linkClassName = styles.navigationItem + " " + (effectiveHasBackground ? "" : styles.noBackground) + " " + (className ?? "");
    if (!link) {
        return (
            <a className={linkClassName} onClick={onClick}>
                {Icon ? <Icon /> : <div className={styles.noIcon}></div>}
                {isExpanded && <span className={styles.title}>{title}</span>}
            </a>
        );
    };

    return (
        <Link href={link} className={linkClassName} onClick={onClick}>
            {Icon ? <Icon /> : <div className={styles.noIcon}></div>}
            {isExpanded && <span className={styles.title}>{title}</span>}
        </Link>
    );
}