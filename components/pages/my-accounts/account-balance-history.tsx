import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import PanelComponent from "@controls/panel";
import { ResponsiveContainer, LineChart, Tooltip, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

import * as models from "@/types/app/my-accounts/page";
import { myAccountsService } from "@/services/app/my-accounts.service";
import { numbersService } from "@/services/numbers";

import styles from './account-balance-history.module.css';

export interface AccountBalanceHistoryProps {
    accountId: string;
}

export default function AccountBalanceHistory({ accountId }: AccountBalanceHistoryProps) {
    const t = useTranslations("Components/Pages/MyAccounts/AccountBalanceHistory");
    const [balanceHistory, setBalanceHistory] = useState<models.AccountBalanceHistory | null>(null);

    useEffect(() => {
        const fetchBalanceHistory = async () => {
            try {
                const history = await myAccountsService.getAccountBalanceHistory(accountId);
                setBalanceHistory(history);
            }
            catch (error) {
                console.error("Error fetching account balance history:", error);
            }
        };
        fetchBalanceHistory();
    }, [accountId]);

    function formatDate(date: string) {
        const d = new Date(date);
        return d.toLocaleDateString();
    }

    function formatValue(value: number) {
        return numbersService.formatCurrency(value, balanceHistory?.currency || '');
    }

    if (!balanceHistory) {
        return <div>Loading account balance history...</div>;
    }

    return (
        <PanelComponent title={t('title')} className={styles["account-balance-history"]}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={balanceHistory.balanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis tickFormatter={formatValue} width={120} />
                    <Tooltip labelFormatter={(label) => formatDate(label as string)} formatter={(value) => formatValue(value as number)} />
                    <Line type="monotone" dataKey="balance" name={t('chart.balance')} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </PanelComponent>
    )
}
