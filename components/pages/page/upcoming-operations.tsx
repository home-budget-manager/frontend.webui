"use client";

import { useState, useEffect } from "react";
import { pageService, FetchUpcomingOperationsRequest, Operation, OperationType } from "@/services/pages/page";

import { numbersService } from "@/services/numbers";
import Widget from "./widget";

import {
    ArrowUpRight,
    ArrowDownRight,
    Equal,
} from "lucide-react";

import styles from "./upcoming-operations.module.css";

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

export default function UpcomingOperations() {
    const [upcomingOperations, setUpcomingOperations] = useState<Operation[]>([]);

    useEffect(() => {
        const fetchUpcomingOperations = async () => {
            const request: FetchUpcomingOperationsRequest = { itemsCount: 5 };
            const response = await pageService.fetchUpcomingOperations(request);
            setUpcomingOperations(response.operations);
        };
        fetchUpcomingOperations();
    }, []);

    return (<Widget title="Upcoming Operations">
        <ul className={styles["operations-list"]}>
            {upcomingOperations.map((op) => (
                <li key={op.label}>
                    <div className={styles.icon}>
                        {(() => {
                            const Icon = getOperationIcon(op.type);
                            return <Icon />;
                        })()}
                    </div>
                    <div className={styles.description}>
                        <div className={styles.label}>{op.label}</div>
                        <div className={styles.date}>{op.date}</div>
                    </div>
                    <div className={styles.amount} data-amount={op.amount}>
                        {numbersService.formatCurrency(op.amount)}
                    </div>
                </li>
            ))}
        </ul>
    </Widget>);
}
