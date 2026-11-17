"use client";

import { useTranslations } from "next-intl";

import BudgetResults, { BudgetResult } from "./budgets-results";

import styles from "./incomes-budgets-results.module.scss";

export default function IncomesBudgetResults() {
    const t = useTranslations("features/dashboard/components/incomes-budgets-results");
    const data: BudgetResult[] = [
        {
            name: "Salary",
            planned: 14000,
            executed: 14234.83
        },
        {
            name: "Interest",
            planned: 2400.58,
            executed: 568,
        },
        {
            name: "Gifts",
            planned: 250,
            executed: 40,
        }
    ];

    return (
        <div className={styles.budgetsResults}>
            <h3>{t("title")}</h3>
            <BudgetResults results={data} overbudgetColor="green" underbudgetColor="red" />
        </div>
    );
};
