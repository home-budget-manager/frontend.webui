import styles from "./buttons.module.css";

export interface ActionButtonProps {
    onClick?: () => void;
    label?: string;
    className?: string;
    children?: React.ReactNode;
}

export function ActionButton({ onClick, className, children, label }: ActionButtonProps) {
    const effectiveClassName = styles.actionButton + ' ' +  (className ? className : "");
    return (
        <button onClick={onClick} className={effectiveClassName} aria-label={label}>
            {children}
        </button>
    );
}