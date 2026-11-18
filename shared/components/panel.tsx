import type { HTMLAttributes } from "react";
import styles from "./panel.module.scss";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
    customClass?: string;
    children: React.ReactNode;
}

export default function Panel({ customClass, children, ...divProps }: PanelProps) {
    const effectiveClass = styles.panel
        + (customClass ? ` ${customClass}` : "");

    return (
        <div {...divProps} className={effectiveClass}>
            {children}
        </div>
    );
}