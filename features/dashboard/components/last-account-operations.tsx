"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useFormatter } from "next-intl";
import Link from "next/link";

import { ButtonSize, Card, ExpandableButton } from "@/shared/components";

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

    function createOperation(type: OperationType) {
        redirect(`/transactions/new/${type}`);
    }

    return (
        <Card title={accountName} customClass={styles.lastAccountOperations}>
            <table>
                <tfoot>
                    <tr>
                        <td colSpan={3}>
                            <div>
                                <div className={styles.currentBalance}>
                                    {formatter.number(operations.reduce((sum, op) => sum + op.amount, 0), { style: "currency", currency: "PLN" })}
                                </div>
                                <div className={styles.createOperation}>
                                    <ExpandableButton
                                        text="Create"
                                        size={ButtonSize.Small}
                                        items={[
                                            { text: "Income", onClick: () => createOperation(OperationType.Income) },
                                            { text: "Expense", onClick: () => createOperation(OperationType.Expense) },
                                            { text: "Transfer", onClick: () => createOperation(OperationType.Transfer) }
                                        ]} />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
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
        </Card>
    );
}