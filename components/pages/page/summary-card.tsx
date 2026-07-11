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
      className="rounded-xl border border-border bg-card p-5"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-bold tracking-tight">{value}</div>
      <div className={`mt-1 text-xs ${positive ? "text-success" : "text-destructive"}`}>
        {change}
      </div>
    </div>
  );
}