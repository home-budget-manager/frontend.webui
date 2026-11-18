"use client";

import { useTranslations } from "next-intl";

import BudgetResults, { BudgetResult } from "./budgets-results";

import styles from "./transfers-budgets-results.module.scss";

export default function TransfersBudgetResults() {
    const t = useTranslations("features/dashboard/components/transfers-budgets-results");
    const data: BudgetResult[] = [
        {
            name: "Savings accounts",
            planned: 1000,
            executed: 1000,
        },
        {
            name: "Savings cushion",
            planned: 500,
            executed: 570,
        },
        {
            name: "Gifts fund",
            planned: 250,
            executed: 40,
        },
    ];

    return (
        <div className={styles.budgetsResults}>
            <h3>{t("title")}</h3>
            <BudgetResults results={data} />
        </div>
    );
};
