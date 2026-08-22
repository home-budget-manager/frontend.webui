import PanelComponent from "@controls/panel";

import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Tooltip, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

import * as models from "@/types/app/my-accounts/page";
import { myAccountsService } from "@/services/app/my-accounts.service";

import styles from './account-balance-history.module.css';

export interface AccountBalanceHistoryProps {
    accountId: string;
}

export default function AccountBalanceHistory({ accountId }: AccountBalanceHistoryProps) {
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

    if (!balanceHistory) {
        return <div>Loading account balance history...</div>;
    }

    return (
        <PanelComponent title='Account balance history' className={styles["account-balance-history"]}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={balanceHistory.balanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="balance" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </PanelComponent>
    )
}
