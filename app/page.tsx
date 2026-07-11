import {
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Briefcase,
  Zap,
  Film,
  CreditCard,
  PiggyBank,
  Landmark,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const lastOperations = [
  { icon: ShoppingCart, label: "Whole Foods Market", category: "Groceries", date: "Jul 7", amount: -84.32 },
  { icon: Briefcase, label: "Monthly Salary", category: "Income", date: "Jul 5", amount: 4200.0 },
  { icon: Utensils, label: "Ramen Nagi", category: "Dining", date: "Jul 5", amount: -28.5 },
  { icon: Car, label: "Shell Gas Station", category: "Transport", date: "Jul 4", amount: -62.1 },
  { icon: Film, label: "Netflix Subscription", category: "Entertainment", date: "Jul 3", amount: -15.99 },
  { icon: Home, label: "Rent Payment", category: "Housing", date: "Jul 1", amount: -1450.0 },
];

const upcomingOperations = [
  { icon: Zap, label: "Electricity Bill", date: "Jul 12", amount: -128.4 },
  { icon: CreditCard, label: "Credit Card Payment", date: "Jul 15", amount: -420.0 },
  { icon: PiggyBank, label: "Savings Transfer", date: "Jul 20", amount: -500.0 },
  { icon: Home, label: "Internet Provider", date: "Jul 22", amount: -59.99 },
  { icon: Briefcase, label: "Freelance Invoice", date: "Jul 28", amount: 850.0 },
];

const accounts = [
  { icon: Landmark, name: "Main Checking", bank: "Chase Bank", balance: 5842.19, trend: "up", change: "+2.4%" },
  { icon: PiggyBank, name: "Emergency Savings", bank: "Ally Bank", balance: 12400.0, trend: "up", change: "+0.8%" },
  { icon: CreditCard, name: "Visa Platinum", bank: "Amex", balance: -1245.5, trend: "down", change: "-8.1%" },
  { icon: TrendingUp, name: "Investment Portfolio", bank: "Fidelity", balance: 28950.75, trend: "up", change: "+4.2%" },
];

function formatCurrency(n: number) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function Page() {
  return (
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Welcome back, Alex. Here&apos;s your financial overview.
              </p>
            </div>

            {/* Summary cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SummaryCard
                label="Total Balance"
                value="$45,947.44"
                change="+3.2% this month"
                positive
              />
              <SummaryCard
                label="Income (July)"
                value="$5,050.00"
                change="+12% vs June"
                positive
              />
              <SummaryCard
                label="Expenses (July)"
                value="$1,640.91"
                change="-4.5% vs June"
                positive
              />
            </div>

            {/* Widgets */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <Widget title="Last Operations" className="lg:col-span-2">
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
                      className={`font-semibold tabular-nums ${
                        op.amount < 0 ? "text-destructive" : "text-success"
                      }`}
                    >
                      {formatCurrency(op.amount)}
                    </span>,
                  ])}
                />
              </Widget>

              <Widget title="Upcoming Operations">
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
                        className={`shrink-0 text-sm font-semibold tabular-nums ${
                          op.amount < 0 ? "text-destructive" : "text-success"
                        }`}
                      >
                        {formatCurrency(op.amount)}
                      </div>
                    </li>
                  ))}
                </ul>
              </Widget>

              <Widget title="List of Accounts" className="lg:col-span-3">
                <Table
                  columns={["Account", "Bank", "Change", "Balance"]}
                  rows={accounts.map((a) => [
                    <div key="n" className="flex min-w-0 items-center gap-3">
                      <div
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-primary-foreground"
                        style={{ background: "var(--gradient-primary)" }}
                      >
                        <a.icon className="h-4 w-4" />
                      </div>
                      <span className="truncate font-medium">{a.name}</span>
                    </div>,
                    <span key="b" className="text-muted-foreground">{a.bank}</span>,
                    <span
                      key="c"
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        a.trend === "up" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {a.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5" />
                      )}
                      {a.change}
                    </span>,
                    <span
                      key="bal"
                      className={`font-semibold tabular-nums ${
                        a.balance < 0 ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {formatCurrency(a.balance)}
                    </span>,
                  ])}
                />
              </Widget>
            </div>
          </div>
        </main>
);
}

function SummaryCard({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}) {
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

function Widget({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-border bg-card p-5 ${className}`}
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        <a href="#" className="text-xs font-medium text-primary hover:underline">
          View all
        </a>
      </div>
      {children}
    </section>
  );
}

function Table({
  columns,
  rows,
}: {
  columns: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((c, i) => (
              <th
                key={c}
                className={`pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
                  i === columns.length - 1 ? "text-right" : "text-left"
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/60 last:border-0">
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`py-3 pr-4 last:pr-0 ${
                    ci === row.length - 1 ? "text-right" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}