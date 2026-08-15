import React, { type ReactNode } from 'react';
import { render } from 'vitest-browser-react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { myAccountsService } from '@/services/app/my-accounts.service';
import ExpensesByCategory from './expenses-by-category';

vi.mock('@/services/app/my-accounts.service', () => ({
    myAccountsService: {
        getExpensesByCategory: vi.fn(),
    },
}));

vi.mock('recharts', () => ({
    PieChart: ({ children, data }: { children?: ReactNode; data: { categoryName: string; ExpensesTotalAmount: number }[] }) => (
        <div data-testid="pie-chart">
            {data.map(({ categoryName, ExpensesTotalAmount }) => (
                <div key={categoryName}>
                    {categoryName}: {ExpensesTotalAmount}
                </div>
            ))}
            {children}
        </div>
    ),
    Pie: () => null,
    ResponsiveContainer: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
    Tooltip: () => null,
}));

const getExpensesByCategory = vi.mocked(myAccountsService.getExpensesByCategory);

describe('ExpensesByCategory', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders a loading state while data is being fetched', async () => {
        let resolveData: (value: { period: string; expensesByCategory: never[] }) => void = () => undefined;
        getExpensesByCategory.mockReturnValue(new Promise(resolve => {
            resolveData = resolve;
        }));

        const screen = await render(<ExpensesByCategory accountId="account-1" />);

        expect(screen.getByText('Loading Expenses by category data...')).toBeTruthy();
        expect(getExpensesByCategory).toHaveBeenCalledWith('account-1');

        resolveData({ period: '2023-08', expensesByCategory: [] });
        await screen.getByText('Expenses by category');
    });

    test('renders the chart data returned by the service', async () => {
        getExpensesByCategory.mockResolvedValue({
            period: '2023-08',
            expensesByCategory: [
                {
                    categoryId: '1',
                    categoryName: 'Groceries',
                    expensesCount: 3,
                    expensesTotalAmount: 125.5,
                    currency: 'USD',
                },
                {
                    categoryId: '2',
                    categoryName: 'Transport',
                    expensesCount: 2,
                    expensesTotalAmount: 40,
                    currency: 'USD',
                },
            ],
        });

        const screen = await render(<ExpensesByCategory accountId="account-2" />);

        await screen.getByText('Expenses by category');
        expect(screen.getByText('Groceries: 125.5')).toBeTruthy();
        expect(screen.getByText('Transport: 40')).toBeTruthy();
        expect(getExpensesByCategory).toHaveBeenCalledWith('account-2');
    });

    test('keeps the loading state when the service fails', async () => {
        const error = new Error('Request failed');
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        getExpensesByCategory.mockRejectedValue(error);

        const screen = await render(<ExpensesByCategory accountId="account-3" />);

        expect(screen.getByText('Loading Expenses by category data...')).toBeTruthy();
        await vi.waitFor(() => expect(consoleError).toHaveBeenCalledWith(
            'Error fetching Expenses by category data:',
            error,
        ));

        consoleError.mockRestore();
    });
});