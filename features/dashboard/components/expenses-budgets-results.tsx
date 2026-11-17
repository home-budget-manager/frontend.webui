"use client";

import { useTranslations } from "next-intl";

import BudgetResults, { BudgetResult } from "./budgets-results";

import styles from "./expenses-budgets-results.module.scss";

export default function ExpensesBudgetResults() {
    const t = useTranslations("features/dashboard/components/expenses-budgets-results");
    const data: BudgetResult[] = [
        {
            name: "Payments",
            planned: 5988.33,
            executed: 1268.11,
        },
        {
            name: "Standard expenses",
            planned: 2400.58,
            executed: 568,
        },
        {
            name: "Streaming",
            planned: 250,
            executed: 40,
        },
        {
            name: "Leisure",
            planned: 50,
            executed: 600,
        },
        {
            name: "Charity",
            planned: 180,
            executed: 0,
        },
        {
            name: "Gifts",
            planned: 600,
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
