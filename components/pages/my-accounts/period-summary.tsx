import { useEffect, useState } from 'react';
import {useTranslations} from 'next-intl';

import {numbersService } from "@services/numbers";
import { myAccountsService } from "@/services/app/my-accounts.service";
import * as models from "@/types/app/my-accounts/page";

import PanelComponent from "@controls/panel";

import styles from './period-summary.module.css';

export interface PeriodSummaryProps {
    accountId: string;
}

export default function PeriodSummary({ accountId }: PeriodSummaryProps) {
    const t = useTranslations('Components/Pages/MyAccounts/PeriodSummary');
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
        return <div>{t('loader')}</div>;
    }

    const totalCount = operationsSummary.items.map(i => i.count).reduce((acc, count) => acc + count, 0);
    const totalAmount = operationsSummary.items.map(i => i.amount).reduce((acc, amount) => acc + amount, 0);

    return (<PanelComponent title={t('title')} className={styles["period-summary"]}>
        <table>
            <colgroup>
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>{t('operationType')}</th>
                    <th>{t('amount')}</th>
                    <th>{t('count')}</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td>{t('total')}</td>
                    <td>{numbersService.formatCurrency(totalAmount)}</td>
                    <td>{totalCount}</td>
                </tr>
            </tfoot>
            <tbody>
                {operationsSummary.items.map((item, index) => (
                    <tr key={index}>
                        <td>{t('itemType', { type: item.itemType })}</td>
                        <td>{numbersService.formatCurrency(item.amount)}</td>
                        <td>{item.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </PanelComponent>);
}
