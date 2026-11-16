"use client";

import styles from "./accounts-chart.module.scss";
import { useFormatter } from "next-intl";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { ResponsiveContainer, LineChart, Tooltip, Line, XAxis, YAxis, CartesianGrid, createHorizontalChart, Legend } from 'recharts';

interface Entry {
    date: string;
    balance: number;
}

interface AccountHistory {
    name: string;
    history: Entry[];
}

interface AccountsChartProps {
    accountIds: string[];
}

export default function AccountsChart({ accountIds }: AccountsChartProps) {
    const t = useTranslations("features/dashboard/components/accounts-chart");
    const [history, setHistory] = useState<any[]>([]);
    const [accountNames, setAccountNames] = useState<string[]>([]);
    const formatter = useFormatter();
    const Typed = createHorizontalChart<any, string, number>()({ XAxis, YAxis, Tooltip, Line });

    useEffect(() => {
        const year = 2027;
        const month = 0;
        const result: any[] = [];
        const accountNames = accountIds.map(i => `Account ${i}`);
        const accountKeys = accountIds.map(i => `account_${i}`);
        const accountBalances = accountIds.map(() => Math.round(Math.random() * 100000 + 20000) / 100);
        for (let i = 0; i < 31; i++) {
            const date = new Date(year, month, i + 1);
            const entry: any = { date: date };
            accountKeys.forEach((accountId, index) => {
                const balanceChange = Math.round(Math.random() * 10000 - 5000) / 100;
                accountBalances[index] += balanceChange;
                entry[accountId] = accountBalances[index];
            });
            result.push(entry);
        }

        setHistory(result);
        setAccountNames(accountNames);
    }, []);

    function formatDate(date: string) {
        const d = /^\d{4}-\d{2}-\d{2}$/.test(date)
            ? new Date(`${date}T00:00:00`)
            : new Date(date);
        return d.toLocaleDateString();
    }

    function formatValue(value: number) {
        return formatter.number(value, { style: 'currency', currency: 'PLN' });
    }

    return (
        <div className={styles.accountsChart}>
            <h3>{t("title")}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <Typed.LineChart
                    responsive
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Typed.XAxis dataKey="date" />
                    <Typed.YAxis width="auto" />
                    <Tooltip labelFormatter={(label) => formatDate(label as string)} formatter={(value) => formatValue(value as number)} />
                    <Legend />
                    {accountIds.map((name, index) => (
                        <Typed.Line key={index} type="monotone" dataKey={`account_${name}`} name={accountNames[index]} stroke={`hsl(${index * 60}, 70%, 50%)`} activeDot={{ r: 8 }} />
                    ))}
                </Typed.LineChart>
            </ResponsiveContainer>
        </div>
    );
}