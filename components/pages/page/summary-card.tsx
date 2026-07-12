import styles from "./summary-card.module.css";

interface SummaryCardProps {
    label: string;
    value: string;
    change: string;
    positive?: boolean;
}

export default function SummaryCard({
  label,
  value,
  change,
  positive,
}: SummaryCardProps) {
  return (
    <div
      className={styles["summary-card"]}
    >
      <div className={styles["label"]}>{label}</div>
      <div className={styles["value"]}>{value}</div>
      <div className={`${styles["change"]} ${positive ? styles["improvement"] : styles["degradation"]}`}>
        {change}
      </div>
    </div>
  );
}