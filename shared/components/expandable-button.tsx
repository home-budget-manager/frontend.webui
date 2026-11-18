import { ReactNode, useId } from "react";

import Button, { Size } from "./button";

import {
    ChevronDown
} from "lucide-react";

import styles from "./expandable-button.module.scss";

export interface Item {
    text: string;
    onClick: () => void;
}

export interface ExpandableButtonProps {
    customClass?: string;
    text: string;
    size?: Size;
    items: Item[];
}

export default function ExpandableButton({ customClass, text, items, size = Size.Medium }: ExpandableButtonProps) {
    const id = useId();
    const resultText: ReactNode = (<>{text} <ChevronDown /></>);
    return (
        <div className={`${styles.expandableButton} ${customClass ?? ""} ${size ?? ""}`}>
            <Button size={size} text={resultText} popoverTarget={id} customClass={styles.button} />
            <div popover="auto" id={id} className={styles.itemsContainer}>
                {items.map((item, index) => (
                    <div key={index} onClick={item.onClick}>
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    );
}