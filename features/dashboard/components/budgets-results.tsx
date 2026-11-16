"use client";

import { useTranslations } from "next-intl";

import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer,
} from "recharts";

import styles from "./budget-results.module.scss";

const BarChartComponent = () => {
    const t = useTranslations("features/dashboard/components/budgets-results");
    const data = [
        {
            name: "Payments",
            used: 5988.33,
            remaining: 1268.11,
        },
        {
            name: "Standard expenses",
            used: 2400.58,
            remaining: 568,
        },
        {
            name: "Streaming",
            used: 250,
            remaining: 40,
        },
        {
            name: "Leisure",
            used: 0,
            remaining: 600,
        },
        {
            name: "Charity",
            used: 180,
            remaining: 0,
        },
        {
            name: "Gifts",
            used: 600,
            remaining: 40,
        },
    ];

    const height = data.length * 40 + 40
    return (
        <div className={styles.budgetsResults}>
            <h3>{t("title")}</h3>
            <ResponsiveContainer width="100%" height={height}>
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 50,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="used" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="remaining" stackId="a" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
