import React, { type ReactNode } from 'react';
import { render } from 'vitest-browser-react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { myAccountsService } from '@/services/app/my-accounts.service';
import ExpensesByBudget from './expenses-by-budget';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/services/app/my-accounts.service', () => ({
    myAccountsService: {
        getExpensesByBudget: vi.fn(),
    },
}));

vi.mock('recharts', () => ({
    PieChart: ({ children, data }: { children?: ReactNode; data: { budgetName: string; ExpensesTotalAmount: number }[] }) => (
        <div data-testid="pie-chart">
            {data.map(({ budgetName, ExpensesTotalAmount }) => (
                <div key={budgetName}>
                    {budgetName}: {ExpensesTotalAmount}
                </div>
            ))}
            {children}
        </div>
    ),
    Pie: () => null,
    ResponsiveContainer: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
    Tooltip: () => null,
}));

const getExpensesByBudget = vi.mocked(myAccountsService.getExpensesByBudget);

describe('ExpensesByBudget', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders a loading state while data is being fetched', async () => {
        let resolveData: (value: { period: string; expensesByBudget: never[] }) => void = () => undefined;
        getExpensesByBudget.mockReturnValue(new Promise(resolve => {
            resolveData = resolve;
        }));

        const screen = await render(<NextIntlClientProvider locale='en'>
            <ExpensesByBudget accountId="account-1" />
        </NextIntlClientProvider>);

        expect(screen.getByText('Loading Expenses by budget data...')).toBeTruthy();
        expect(getExpensesByBudget).toHaveBeenCalledWith('account-1');

        resolveData({ period: '2023-08', expensesByBudget: [] });
        await screen.getByText('Expenses by budget');
    });

    test('renders the chart data returned by the service', async () => {
        getExpensesByBudget.mockResolvedValue({
            period: '2023-08',
            expensesByBudget: [
                {
                    budgetId: '1',
                    budgetName: 'Groceries',
                    expensesCount: 3,
                    expensesTotalAmount: 125.5,
                    currency: 'USD',
                },
                {
                    budgetId: '2',
                    budgetName: 'Transport',
                    expensesCount: 2,
                    expensesTotalAmount: 40,
                    currency: 'USD',
                },
            ],
        });

        const screen = await render(<NextIntlClientProvider locale='en'>
            <ExpensesByBudget accountId="account-2" />
        </NextIntlClientProvider>);

        await screen.getByText('Expenses by budget');
        expect(screen.getByText('Groceries: 125.5')).toBeTruthy();
        expect(screen.getByText('Transport: 40')).toBeTruthy();
        expect(getExpensesByBudget).toHaveBeenCalledWith('account-2');
    });

    test('keeps the loading state when the service fails', async () => {
        const error = new Error('Request failed');
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        getExpensesByBudget.mockRejectedValue(error);

        const screen = await render(<NextIntlClientProvider locale='en'>
            <ExpensesByBudget accountId="account-3" />
        </NextIntlClientProvider>);

        expect(screen.getByText('Loading Expenses by budget data...')).toBeTruthy();
        await vi.waitFor(() => expect(consoleError).toHaveBeenCalledWith(
            'Error fetching Expenses by budget data:',
            error,
        ));

        consoleError.mockRestore();
    });
});