import React, { type ReactNode } from 'react';
import { render } from 'vitest-browser-react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { myAccountsService } from '@/services/app/my-accounts.service';
import OperationsByCategory from './operations-by-category';

vi.mock('@/services/app/my-accounts.service', () => ({
    myAccountsService: {
        getOperationsByCategory: vi.fn(),
    },
}));

vi.mock('recharts', () => ({
    PieChart: ({ children, data }: { children?: ReactNode; data: { categoryName: string; operationsTotalAmount: number }[] }) => (
        <div data-testid="pie-chart">
            {data.map(({ categoryName, operationsTotalAmount }) => (
                <div key={categoryName}>
                    {categoryName}: {operationsTotalAmount}
                </div>
            ))}
            {children}
        </div>
    ),
    Pie: () => null,
    ResponsiveContainer: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
    Tooltip: () => null,
}));

const getOperationsByCategory = vi.mocked(myAccountsService.getOperationsByCategory);

describe('OperationsByCategory', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders a loading state while data is being fetched', async () => {
        let resolveData: (value: { period: string; operationsByCategory: never[] }) => void = () => undefined;
        getOperationsByCategory.mockReturnValue(new Promise(resolve => {
            resolveData = resolve;
        }));

        const screen = await render(<OperationsByCategory accountId="account-1" />);

        expect(screen.getByText('Loading operations by category data...')).toBeTruthy();
        expect(getOperationsByCategory).toHaveBeenCalledWith('account-1');

        resolveData({ period: '2023-08', operationsByCategory: [] });
        await screen.getByText('Operations by category');
    });

    test('renders the chart data returned by the service', async () => {
        getOperationsByCategory.mockResolvedValue({
            period: '2023-08',
            operationsByCategory: [
                {
                    categoryName: 'Groceries',
                    operationsCount: 3,
                    operationsTotalAmount: 125.5,
                    currency: 'USD',
                },
                {
                    categoryName: 'Transport',
                    operationsCount: 2,
                    operationsTotalAmount: 40,
                    currency: 'USD',
                },
            ],
        });

        const screen = await render(<OperationsByCategory accountId="account-2" />);

        await screen.getByText('Operations by category');
        expect(screen.getByText('Groceries: 125.5')).toBeTruthy();
        expect(screen.getByText('Transport: 40')).toBeTruthy();
        expect(getOperationsByCategory).toHaveBeenCalledWith('account-2');
    });

    test('keeps the loading state when the service fails', async () => {
        const error = new Error('Request failed');
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        getOperationsByCategory.mockRejectedValue(error);

        const screen = await render(<OperationsByCategory accountId="account-3" />);

        expect(screen.getByText('Loading operations by category data...')).toBeTruthy();
        await vi.waitFor(() => expect(consoleError).toHaveBeenCalledWith(
            'Error fetching operations by category data:',
            error,
        ));

        consoleError.mockRestore();
    });
});