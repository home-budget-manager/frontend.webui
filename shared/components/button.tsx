import { HTMLAttributes } from 'react';
import { ReactNode } from 'react';
import styles from './button.module.scss';

export enum Size {
    Small = "small",
    Medium = "medium",
    Large = "large"
}

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text: ReactNode;
    customClass?: string;
    onClick?: () => void;
    size?: Size;
}

export default function Button({ text, onClick, size = Size.Medium, customClass, ...buttonProps }: ButtonProps) {
    return (
        <button className={`${styles.button} ${styles[size]} ${customClass ?? ""}`} onClick={onClick} {...buttonProps}>
            {text}
        </button>
    );
}