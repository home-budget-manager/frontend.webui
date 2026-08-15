import * as models from "@/types/app/my-accounts/page";
import { PieChart, ResponsiveContainer, Pie, Tooltip } from 'recharts';
import PanelComponent from "@controls/panel";

import { myAccountsService } from "@/services/app/my-accounts.service";
import { useEffect, useState } from 'react';

export interface ExpensesByCategoryProps {
    accountId: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#F39C12', '#E74C3C', '#1ABC9C'];

export default function ExpensesByCategory({ accountId }: ExpensesByCategoryProps) {
    const [ExpensesByCategoryData, setExpensesByCategoryData] = useState<models.ExpensesByCategoryData | null>(null);

    useEffect(() => {
        const fetchExpensesByCategoryData = async () => {
            try {
                const data = await myAccountsService.getExpensesByCategory(accountId);
                setExpensesByCategoryData(data);
            } catch (error) {
                console.error("Error fetching Expenses by category data:", error);
            }
        };
        fetchExpensesByCategoryData();
    }, [accountId]);
    
    if (!ExpensesByCategoryData) {
        return <div>Loading Expenses by category data...</div>;
    }

    return (<PanelComponent title='Expenses by category'>
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
                data={ExpensesByCategoryData.expensesByCategory.map(category => ({
                    categoryName: category.categoryName,
                    expensesCount: category.expensesCount,
                    expensesTotalAmount: category.expensesTotalAmount,
                    currency: category.currency,
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
                    data={ExpensesByCategoryData.expensesByCategory.map((category, index) => {
                        return {
                            fill: COLORS[index % COLORS.length],
                            name: category.categoryName,
                            expensesCount: category.expensesCount,
                            expensesTotalAmount: category.expensesTotalAmount,
                        };
                    })}
                    dataKey="expensesTotalAmount"
                />
                <Tooltip defaultIndex={3} />
            </PieChart>
        </ResponsiveContainer>
    </PanelComponent>);
}