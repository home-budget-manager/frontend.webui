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
}

export default function NavigationItem({ title, link, icon: Icon, isExpanded, onClick, hasBackground }: NavigationItemProps) {
    const effectiveHasBackground = hasBackground ?? true;
    const linkClassName = styles.navigationItem + " " + (effectiveHasBackground ? "" : styles.noBackground);
    return (
        <Link href={link} className={linkClassName} onClick={onClick}>
            {Icon ? <Icon /> : <div className={styles.noIcon}></div>}
            {isExpanded && title}
        </Link>
    );
}