import { useTranslations } from "next-intl";

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
    { id: 1, icon: Landmark, name: "Main Checking", accountType: "Checking", balance: 5842.19, trend: "up", change: "+2.4%" },
    { id: 2, icon: PiggyBank, name: "Emergency Savings", accountType: "Checking", balance: 12400.0, trend: "up", change: "+0.8%" },
    { id: 3, icon: CreditCard, name: "Visa Platinum", accountType: "Savings", balance: -1245.5, trend: "down", change: "-8.1%" },
    { id: 4, icon: TrendingUp, name: "Investment Portfolio", accountType: "Savings", balance: 28950.75, trend: "up", change: "+4.2%" },
];

export default function AccountsList() {
    const t = useTranslations("Components/Pages/Page/AccountsList");
    return (<Panel title={t("title")} className={styles["accounts-list"]}>
        <table>
            <thead>
                <tr>
                    <th>{t("columns.accountName")}</th>
                    <th>{t("columns.accountType")}</th>
                    <th>{t("columns.balanceChange")}</th>
                    <th>{t("columns.balance")}</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((a) => (
                    <tr key={a.id}>
                        <td className={styles["col-name"]}>
                            <div
                                className={styles["icon-container"]}>
                                <a.icon />
                            </div>
                            <span className={styles["name-container"]}>{a.name}</span>
                        </td>
                        <td>{a.accountType}</td>
                        <td>
                            <span
                                className={`inline-flex items-center gap-1 text-sm font-medium ${a.trend === "up" ? "text-success" : "text-destructive"
                                    }`}
                            >
                                {a.trend === "up" ? (
                                    <TrendingUp className="h-3.5 w-3.5" />
                                ) : (
                                    <TrendingDown className="h-3.5 w-3.5" />
                                )}
                                {a.change}
                            </span>
                        </td>
                        <td>
                            <span
                                className={`font-semibold tabular-nums ${a.balance < 0 ? "text-destructive" : "text-foreground"
                                    }`}
                            >
                                {numbersService.formatCurrency(a.balance)}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Panel>);
}