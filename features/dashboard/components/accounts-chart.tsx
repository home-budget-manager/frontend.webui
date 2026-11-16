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

const initialHistory: AccountHistory[] = [
    {
        name: "Account 1",
        history: [
            { date: '2024-01-01', balance: 1000 },
            { date: '2024-02-01', balance: 1200 },
            { date: '2024-03-01', balance: 900 },
            { date: '2024-04-01', balance: 1100 }
        ]
    },
    {
        name: "Account 2",
        history: [
            { date: '2024-01-01', balance: 2000 },
            { date: '2024-02-01', balance: 1500 },
            { date: '2024-03-01', balance: 200 },
            { date: '2024-04-01', balance: 1900 }
        ]
    }
];

export default function AccountsChart() {
    const t = useTranslations("features/dashboard/components/accounts-chart");
    const [history, setHistory] = useState<any[]>([]);
    const [accountNames, setAccountNames] = useState<string[]>([]);
    const formatter = useFormatter();
    const Typed = createHorizontalChart<any, string, number>()({ XAxis, YAxis, Tooltip, Line });


    useEffect(() => {
        const accountNames = initialHistory.map(account => account.name);
        const dates = Array.from(new Set(initialHistory.flatMap(account => account.history.map(entry => entry.date))));
        const result: any[] = [];
        for (const date of dates) {
            const entry: any = { date };
            for (const account of initialHistory) {
                const accountEntry = account.history.find(e => e.date === date);
                entry[account.name.replace(/\s+/g, '_')] = accountEntry ? accountEntry.balance : 0;
            }
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
                    {accountNames.map((name, index) => (
                        <Typed.Line key={index} type="monotone" dataKey={name.replace(/\s+/g, '_')} name={name} stroke={`hsl(${index * 60}, 70%, 50%)`} activeDot={{ r: 8 }} />
                    ))}
                </Typed.LineChart>
            </ResponsiveContainer>
        </div>
    );
}