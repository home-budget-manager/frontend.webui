import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import * as models from "@/types/app/my-accounts/page";
import { PieChart, ResponsiveContainer, Pie, Tooltip } from 'recharts';
import PanelComponent from "@controls/panel";

import { myAccountsService } from "@/services/app/my-accounts.service";

export interface ExpensesByBudgetProps {
    accountId: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#F39C12', '#E74C3C', '#1ABC9C'];

export default function ExpensesByBudget({ accountId }: ExpensesByBudgetProps) {
    const t = useTranslations("Components/Pages/MyAccounts/ExpensesByBudget");
    const [ExpensesByBudgetData, setExpensesByBudgetData] = useState<models.ExpensesByBudgetData | null>(null);

    useEffect(() => {
        const fetchExpensesByBudgetData = async () => {
            try {
                const data = await myAccountsService.getExpensesByBudget(accountId);
                setExpensesByBudgetData(data);
            } catch (error) {
                console.error("Error fetching Expenses by budget data:", error);
            }
        };
        fetchExpensesByBudgetData();
    }, [accountId]);
    
    if (!ExpensesByBudgetData) {
        return <div>Loading Expenses by budget data...</div>;
    }

    return (<PanelComponent title={t('title')}>
        <ResponsiveContainer
            height={400}
            width="100%"
        >
            <PieChart
                accessibilityLayer
                barCategoryGap="10%"
                barGap={4}
                cx="50%"
                cy="50%"
                data={ExpensesByBudgetData.expensesByBudget.map(budget => ({
                    budgetName: budget.budgetName,
                    expensesCount: budget.expensesCount,
                    expensesTotalAmount: budget.expensesTotalAmount,
                    currency: budget.currency,
                }))}
                endAngle={360}
                innerRadius={0}
                layout="centric"
                margin={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0
                }}
                outerRadius="80%"
                responsive={false}
                reverseStackOrder={false}
                stackOffset="none"
                startAngle={0}
                syncMethod="index"
                throttleDelay="raf"
                throttledEvents={[
                    'mousemove',
                    'touchmove',
                    'pointermove',
                    'scroll',
                    'wheel'
                ]}
            >
                <Pie
                    data={ExpensesByBudgetData.expensesByBudget.map((budget, index) => {
                        return {
                            fill: COLORS[index % COLORS.length],
                            name: budget.budgetName,
                            expensesCount: budget.expensesCount,
                            expensesTotalAmount: budget.expensesTotalAmount,
                        };
                    })}
                    dataKey="expensesTotalAmount"
                />
                <Tooltip defaultIndex={3} />
            </PieChart>
        </ResponsiveContainer>
    </PanelComponent>);
}