import { useEffect, useState } from 'react';

import {numbersService } from "@services/numbers";
import { myAccountsService } from "@/services/app/my-accounts.service";
import * as models from "@/types/app/my-accounts/page";

import PanelComponent from "@controls/panel";

import styles from './period-summary.module.css';

export interface PeriodSummaryProps {
    accountId: string;
}

export default function PeriodSummary({ accountId }: PeriodSummaryProps) {
    const [operationsSummary, setOperationsSummary] = useState<models.OperationsSummary | null>(null);
    const [totalOperationsCount, setTotalOperationsCount] = useState<number>(0);
    const [totalOperationsAmount, setTotalOperationsAmount] = useState<number>(0);

    useEffect(() => {
        const fetchOperationsSummary = async () => {
            try {
                const summary = await myAccountsService.getAccountOperationsSummary(accountId);
                setOperationsSummary(summary);
            }
            catch (error) {
                console.error("Error fetching operations summary:", error);
            }
        };
        fetchOperationsSummary();
    }, [accountId]);

    useEffect(() => {
        if (operationsSummary) {
            const totalCount = operationsSummary.incomes.count + operationsSummary.expenses.count + operationsSummary.transfersIncoming.count + operationsSummary.transfersOutgoing.count;
            const totalAmount = operationsSummary.incomes.amount + operationsSummary.expenses.amount + operationsSummary.transfersIncoming.amount + operationsSummary.transfersOutgoing.amount;
            setTotalOperationsCount(totalCount);
            setTotalOperationsAmount(totalAmount);
        }
    }, [operationsSummary]);

    if (!operationsSummary) {
        return <div>Loading operations summary...</div>;
    }

    return (<PanelComponent title='Current period summary' className={styles["period-summary"]}>
        <table>
            <colgroup>
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>Operation type</th>
                    <th>Amount</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>{numbersService.formatCurrency(totalOperationsAmount)}</td>
                    <td>{totalOperationsCount}</td>
                </tr>
            </tfoot>
            <tbody>
                <tr>
                    <td>Income</td>
                    <td>{numbersService.formatCurrency(operationsSummary.incomes.amount)}</td>
                    <td>{operationsSummary.incomes.count}</td>
                </tr>
                <tr>
                    <td>Expenses</td>
                    <td>{numbersService.formatCurrency(operationsSummary.expenses.amount)}</td>
                    <td>{operationsSummary.expenses.count}</td>
                </tr>
                <tr>
                    <td>Transfers (incoming)</td>
                    <td>{numbersService.formatCurrency(operationsSummary.transfersIncoming.amount)}</td>
                    <td>{operationsSummary.transfersIncoming.count}</td>
                </tr>
                <tr>
                    <td>Transfers (outgoing)</td>
                    <td>{numbersService.formatCurrency(operationsSummary.transfersOutgoing.amount)} </td>
                    <td>{operationsSummary.transfersOutgoing.count}</td>
                </tr>
            </tbody>
        </table>
    </PanelComponent>);
}
