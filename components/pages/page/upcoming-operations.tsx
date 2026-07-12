import Widget from "./widget";

import {
  Home,
  Briefcase,
  Zap,
  CreditCard,
  PiggyBank,
} from "lucide-react";

const upcomingOperations = [
  { icon: Zap, label: "Electricity Bill", date: "Jul 12", amount: -128.4 },
  { icon: CreditCard, label: "Credit Card Payment", date: "Jul 15", amount: -420.0 },
  { icon: PiggyBank, label: "Savings Transfer", date: "Jul 20", amount: -500.0 },
  { icon: Home, label: "Internet Provider", date: "Jul 22", amount: -59.99 },
  { icon: Briefcase, label: "Freelance Invoice", date: "Jul 28", amount: 850.0 },
];

function formatCurrency(n: number) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function UpcomingOperations() {
    return (<Widget title="Upcoming Operations">
        <ul className="divide-y divide-border">
            {upcomingOperations.map((op) => (
                <li key={op.label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-secondary text-secondary-foreground">
                        <op.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{op.label}</div>
                        <div className="text-xs text-muted-foreground">{op.date}</div>
                    </div>
                    <div
                        className={`shrink-0 text-sm font-semibold tabular-nums ${op.amount < 0 ? "text-destructive" : "text-success"
                            }`}
                    >
                        {formatCurrency(op.amount)}
                    </div>
                </li>
            ))}
        </ul>
    </Widget>);
}
