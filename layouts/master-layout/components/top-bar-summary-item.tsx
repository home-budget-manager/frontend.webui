import styles from "./top-bar-summary-item.module.scss";

export interface TopBarSummaryItemProps {
    label: string;
    value: string;
}

export default function TopBarSummaryItem({ label, value }: TopBarSummaryItemProps) {
    return (
        <div className={styles.topBarSummaryItem}>
            <span className={styles.label}>{label}:</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
}