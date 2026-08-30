import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import * as models from "@/types/app/my-accounts/page";
import { PieChart, ResponsiveContainer, Pie, Tooltip } from 'recharts';
import { Panel, Loader } from "@/components/controls";

import { myAccountsService } from "@/services/app/my-accounts.service";

export interface ExpensesByCategoryProps {
    accountId: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#F39C12', '#E74C3C', '#1ABC9C'];

export default function ExpensesByCategory({ accountId }: ExpensesByCategoryProps) {
    const t = useTranslations("Components/Pages/MyAccounts/ExpensesByCategory");
    const [expensesByCategoryData, setExpensesByCategoryData] = useState<models.ExpensesByCategoryData | null>(null);

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

    return (<Panel title={t('title')}>
        <ResponsiveContainer
            height={400}
            width="100%"
        >
            {!expensesByCategoryData ?
                (<div><Loader /></div>) :
                <PieChart
                    accessibilityLayer
                    barCategoryGap="10%"
                    barGap={4}
                    cx="50%"
                    cy="50%"
                    data={expensesByCategoryData.expensesByCategory.map(category => ({
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
                        data={expensesByCategoryData.expensesByCategory.map((category, index) => {
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
            }
        </ResponsiveContainer>
    </Panel>);
}