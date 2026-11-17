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

export interface BudgetResult {
    name: string;
    planned: number;
    executed: number;
}

export interface BudgetsResultsProps {
    results: BudgetResult[];
    overbudgetColor?: string;
    underbudgetColor?: string;
}

interface DataPoint {
    name: string;
    executed: number;
    excess: number;
    remaining: number;
}

export default function BudgetsResults({ results, overbudgetColor, underbudgetColor }: BudgetsResultsProps) {
    const t = useTranslations("features/dashboard/components/budgets-results");
    const data = results.map(result => {
        const remaining = Math.max(0, result.planned - result.executed);
        const excess = Math.max(0, result.executed - result.planned);
        let executed = result.executed;
        if (excess > 0) {
            executed = result.planned;
        }
        return {
            name: result.name,
            executed,
            excess,
            remaining,
        };
    });
    overbudgetColor = overbudgetColor ?? "red";
    underbudgetColor = underbudgetColor ?? "green";
    const height = results.length * 40 + 40
    return (
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
                <Bar dataKey="executed" stackId="a" fill="blue" name={t("budgetBars.executed")} />
                <Bar dataKey="excess" stackId="a" fill={overbudgetColor} name={t("budgetBars.overbudget")} />
                <Bar dataKey="remaining" stackId="a" fill={underbudgetColor} name={t("budgetBars.remaining")} />
            </BarChart>
        </ResponsiveContainer>);
}