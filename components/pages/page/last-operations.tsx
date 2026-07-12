import Widget from "./widget";
import Table from "./table";
import {
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Briefcase,
  Film,
} from "lucide-react";

import styles from './last-operations.module.css';

const lastOperations = [
  { icon: ShoppingCart, label: "Whole Foods Market", category: "Groceries", date: "Jul 7", amount: -84.32 },
  { icon: Briefcase, label: "Monthly Salary", category: "Income", date: "Jul 5", amount: 4200.0 },
  { icon: Utensils, label: "Ramen Nagi", category: "Dining", date: "Jul 5", amount: -28.5 },
  { icon: Car, label: "Shell Gas Station", category: "Transport", date: "Jul 4", amount: -62.1 },
  { icon: Film, label: "Netflix Subscription", category: "Entertainment", date: "Jul 3", amount: -15.99 },
  { icon: Home, label: "Rent Payment", category: "Housing", date: "Jul 1", amount: -1450.0 },
];

function formatCurrency(n: number) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function LastOperations() {
    return (        <Widget title="Last Operations" className="lg:col-span-2">
            <Table
                columns={["Description", "Category", "Date", "Amount"]}
                rows={lastOperations.map((op) => [
                    <div key="d" className="flex min-w-0 items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                            <op.icon className="h-4 w-4" />
                        </div>
                        <span className="truncate font-medium">{op.label}</span>
                    </div>,
                    <span key="c" className="text-muted-foreground">{op.category}</span>,
                    <span key="dt" className="text-muted-foreground">{op.date}</span>,
                    <span
                        key="a"
                        className={`font-semibold tabular-nums ${op.amount < 0 ? "text-destructive" : "text-success"
                            }`}
                    >
                        {formatCurrency(op.amount)}
                    </span>,
                ])}
            />
        </Widget>
);
}
