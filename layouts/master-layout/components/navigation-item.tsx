import Link from "next/link";
import type { ComponentType } from "react";

import styles from "./navigation-item.module.scss";

export interface NavigationItemProps {
    icon: ComponentType;
    title?: string;
    link: string;
    isExpanded: boolean;
    onClick?: () => void;
    hasBackground?: boolean;
    className?: string;
    isActive?: boolean;
}

export default function NavigationItem({ title, link, icon: Icon, isExpanded, onClick, hasBackground, className, isActive }: NavigationItemProps) {
    const effectiveHasBackground = hasBackground ?? true;
    const linkClassName = styles.navigationItem + " " + (effectiveHasBackground ? "" : styles.noBackground) + " " + (isActive ? styles.active : "") + " " + (className ?? "");
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