"use client";
import { useState, useEffect } from "react";
import { pageService, Operation, OperationType } from "@/services/pages/page";
import { numbersService } from "@/services/numbers";
import Widget from "./widget";
import Table from "./table";
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
    const [operations, setOperations] = useState<Operation[]>([]);

    useEffect(() => {
        pageService.fetchLastOperations({ itemsCount: 5 }).then(response => {
            setOperations(response.operations);
        });
    }, []);
    return (<Widget title="Last Operations" className={styles["last-operations"]}>
        <Table
            columns={["Description", "Category", "Date", "Amount"]}
            rows={operations.map((op) => [
                <div key="d" className={styles.descriptionContainer}>
                    <div className={styles.iconBorder}>
                        {(() => {
                            const Icon = getOperationIcon(op.type);
                            return <Icon />;
                        })()}
                    </div>
                    <span className={styles.label}>{op.label}</span>
                </div>,
                <span key="c" className={styles.categoryContainer}>{op.category}</span>,
                <span key="dt" className={styles.dateContainer}>{op.date}</span>,
                <span key="a" className={`${styles.amountContainer} ${getOperationAmountClass(op.type)}`}>
                    {numbersService.formatCurrency(op.amount)}
                </span>,
            ])}
        />
    </Widget>
    );
}
