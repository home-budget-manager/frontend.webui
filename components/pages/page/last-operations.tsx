"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { pageService, Operation, OperationType } from "@/services/pages/page";
import { numbersService } from "@/services/numbers";
import Panel from "@controls/panel";
import Table from "@controls/table";
import {
    ArrowUpRight,
    Equal,
    ArrowDownRight
} from "lucide-react";

import styles from './last-operations.module.css';

function getOperationIcon(type: OperationType) {
    switch (type) {
        case "income":
            return ArrowUpRight;
        case "expense":
            return ArrowDownRight;
        case "transfer":
            return Equal;
    }
}

function getOperationAmountClass(type: OperationType) {
    switch (type) {
        case "income":
            return styles.income;
        case "expense":
            return styles.cost;
        case "transfer":
            return styles.transfer;
    }
}

export default function LastOperations() {
    const t = useTranslations("Components/Pages/Page/LastOperations");
    const [operations, setOperations] = useState<Operation[]>([]);

    useEffect(() => {
        pageService.fetchLastOperations({ itemsCount: 5 }).then(response => {
            setOperations(response.operations);
        });
    }, []);
    return (<Panel title={t("title")} className={styles["last-operations"]}>
        <table>
            <thead>
                <tr>
                    <th>{t("columns.description")}</th>
                    <th>{t("columns.category")}</th>
                    <th>{t("columns.date")}</th>
                    <th>{t("columns.amount")}</th>
                </tr>
            </thead>
            <tbody>
                {operations.map((op) => (
                    <tr key={op.id}>
                        <td className={styles.descriptionContainer}>
                            <div className={styles.iconBorder}>
                                {(() => {
                                    const Icon = getOperationIcon(op.type);
                                    return <Icon />;
                                })()}
                            </div>
                            <span className={styles.label}>{op.label}</span>
                        </td>
                        <td className={styles.categoryContainer}>{op.category}</td>
                        <td className={styles.dateContainer}>{op.date}</td>
                        <td className={`${styles.amountContainer} ${getOperationAmountClass(op.type)}`}>
                            {numbersService.formatCurrency(op.amount)}
                        </td>
                    </tr>))}
            </tbody>
        </table>
    </Panel>
    );
}
