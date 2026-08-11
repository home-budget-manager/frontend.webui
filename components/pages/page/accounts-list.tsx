import Panel from "@controls/panel";
import Table from "@controls/table";
import { numbersService } from "@/services/numbers";

import styles from "./accounts-list.module.css";

import {
  CreditCard,
  PiggyBank,
  Landmark,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const accounts = [
  { icon: Landmark, name: "Main Checking", bank: "Chase Bank", balance: 5842.19, trend: "up", change: "+2.4%" },
  { icon: PiggyBank, name: "Emergency Savings", bank: "Ally Bank", balance: 12400.0, trend: "up", change: "+0.8%" },
  { icon: CreditCard, name: "Visa Platinum", bank: "Amex", balance: -1245.5, trend: "down", change: "-8.1%" },
  { icon: TrendingUp, name: "Investment Portfolio", bank: "Fidelity", balance: 28950.75, trend: "up", change: "+4.2%" },
];

export default function AccountsList() {
    return (<Panel title="List of Accounts" className={styles["accounts-list"]}>
            <Table
                columns={["Account", "Bank", "Change", "Balance"]}
                rows={accounts.map((a) => [
                    <div key="n" className={styles["col-name"]}>
                        <div
                            className={styles["icon-container"]}>
                            <a.icon />
                        </div>
                        <span className={styles["name-container"]}>{a.name}</span>
                    </div>,
                    <span key="b" className="text-muted-foreground">{a.bank}</span>,
                    <span
                        key="c"
                        className={`inline-flex items-center gap-1 text-sm font-medium ${a.trend === "up" ? "text-success" : "text-destructive"
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
                        className={`font-semibold tabular-nums ${a.balance < 0 ? "text-destructive" : "text-foreground"
                            }`}
                    >
                        {numbersService.formatCurrency(a.balance)}
                    </span>,
                ])}
            />
        </Panel>);
}