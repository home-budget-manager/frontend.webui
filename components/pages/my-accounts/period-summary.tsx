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

    if (!operationsSummary) {
        return <div>Loading operations summary...</div>;
    }

    const totalCount = operationsSummary.items.map(i => i.count).reduce((acc, count) => acc + count, 0);
    const totalAmount = operationsSummary.items.map(i => i.amount).reduce((acc, amount) => acc + amount, 0);

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
                    <td>{numbersService.formatCurrency(totalAmount)}</td>
                    <td>{totalCount}</td>
                </tr>
            </tfoot>
            <tbody>
                {operationsSummary.items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>{numbersService.formatCurrency(item.amount)}</td>
                        <td>{item.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </PanelComponent>);
}
