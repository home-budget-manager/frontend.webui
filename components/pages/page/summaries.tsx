import SummaryCard from "@/components/pages/page/summary-card";
import styles from "./summaries.module.css";

const summaries = [
  { label: "Total Balance", value: "$45,947.44", change: "+3.2% this month", positive: true },
  { label: "Income (July)", value: "$5,050.00", change: "+12% vs June", positive: true },
  { label: "Expenses (July)", value: "$1,640.91", change: "-4.5% vs June" },
];

export default function Summaries() {
    return (<div className={styles["summary-grid"]}>
        {summaries.map((summary) => (
          <SummaryCard
            key={summary.label}
            label={summary.label}
            value={summary.value}
            change={summary.change}
            positive={summary.positive}
          />
        ))}
      </div>);
}