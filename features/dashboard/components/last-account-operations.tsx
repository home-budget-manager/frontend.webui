"use client";

import { useEffect, useState } from "react";
import { useFormatter } from "next-intl";
import Link from "next/link";

import {
    ArrowRight,
    ArrowLeft,
    ArrowLeftRight
} from "lucide-react";

import styles from "./last-account-operations.module.scss";

interface LastAccountOperationsProps {
    accountId: string;
}

enum OperationType {
    Income = "Income",
    Expense = "Expense",
    Transfer = "Transfer"
}

interface Operation {
    id: string;
    date: string;
    amount: number;
    description: string;
    type: OperationType;
}

const initialOperations: Operation[] = [
    {
        id: '1',
        date: '2024-01-01',
        amount: 100,
        type: OperationType.Income,
        description: 'Salary'
    },
    {
        id: '2',
        date: '2024-01-02',
        amount: -50,
        type: OperationType.Expense,
        description: 'Food and beverages'
    },
    {
        id: '3',
        date: '2024-01-03',
        amount: 200,
        type: OperationType.Income,
        description: 'Return from friend'
    },
    {
        id: '4',
        date: '2024-01-04',
        amount: -30,
        type: OperationType.Transfer,
        description: 'Savings transfer'
    },
    {
        id: '5',
        date: '2024-01-05',
        amount: 150,
        type: OperationType.Expense,
        description: 'Parking'
    }
];

export default function LastAccountOperations({ accountId }: LastAccountOperationsProps) {
    const [accountName, setAccountName] = useState<string>("");
    const [operations, setOperations] = useState<Operation[]>([]);
    const formatter = useFormatter();

    useEffect(() => {
        setAccountName(`Account ${accountId}`);
        setOperations(initialOperations);
    }, [accountId]);

    function getOperationIcon(type: OperationType) {
        switch (type) {
            case OperationType.Income:
                return <ArrowRight />;
            case OperationType.Expense:
                return <ArrowLeft />;
            case OperationType.Transfer:
                return <ArrowLeftRight />;
            default:
                return null;
        }
    }

    return (
        <div className={styles.lastAccountOperations}>
            <h3><Link href={`/accounts/${accountId}`}>{accountName}</Link></h3>
            <table>
                <tbody>
                    {operations.map(op => (
                        <tr key={op.id}>
                            <td className={styles.icon}>{getOperationIcon(op.type)}</td>
                            <td className={styles.description}><Link href={`/transactions/${op.id}`}>{op.description}</Link></td>
                            <td className={styles.amount}>{formatter.number(op.amount, { style: "currency", currency: "PLN" })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}