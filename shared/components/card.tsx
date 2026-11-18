import { HTMLAttributes } from "react";

import Panel from "./panel";

import styles from "./card.module.scss";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    customClass?: string;
    title: string;
    children: React.ReactNode;
}

export default function Card({ customClass, title, children, ...divProps }: CardProps) {
    const effectiveClass = styles.card
        + (customClass ? ` ${customClass}` : "");

    return (
        <Panel {...divProps} customClass={effectiveClass}>
            <h2>{title}</h2>
            {children}
        </Panel>
    );
}