import React, { type ReactNode } from 'react';
import { render } from 'vitest-browser-react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { myAccountsService } from '@/services/app/my-accounts.service';
import AccountBalanceHistory from './account-balance-history';

vi.mock('@/services/app/my-accounts.service', () => ({
    myAccountsService: {
        getAccountBalanceHistory: vi.fn(),
    },
}));

vi.mock('recharts', () => ({
    CartesianGrid: () => null,
    Line: () => null,
    LineChart: ({ children, data }: { children?: ReactNode; data: { date: string; balance: number }[] }) => (
        <div data-testid="line-chart">
            {data.map(({ date, balance }) => (
                <div key={date}>
                    {date}: {balance}
                </div>
            ))}
            {children}
        </div>
    ),
    ResponsiveContainer: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
    Tooltip: () => null,
    XAxis: () => null,
    YAxis: () => null,
}));

const getAccountBalanceHistory = vi.mocked(myAccountsService.getAccountBalanceHistory);

describe('AccountBalanceHistory', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders a loading state while data is being fetched', async () => {
        let resolveData: (value: { currency: string; balanceHistory: never[] }) => void = () => undefined;
        getAccountBalanceHistory.mockReturnValue(new Promise(resolve => {
            resolveData = resolve;
        }));

        const screen = await render(<AccountBalanceHistory accountId="account-1" />);

        expect(screen.getByText('Loading account balance history...')).toBeTruthy();
        expect(getAccountBalanceHistory).toHaveBeenCalledWith('account-1');

        resolveData({
            currency: 'USD',
            balanceHistory: [],
        });
        await screen.getByText('Account balance history');
    });

    test('renders the chart data returned by the service', async () => {
        getAccountBalanceHistory.mockResolvedValue({
            currency: 'USD',
            balanceHistory: [
                {
                    date: '2023-08-01',
                    balance: 1000,
                },
                {
                    date: '2023-08-02',
                    balance: 950,
                },
            ],
        });

        const screen = await render(<AccountBalanceHistory accountId="account-2" />);

        await screen.getByText('Account balance history');
        expect(screen.getByText('2023-08-01: 1000')).toBeTruthy();
        expect(screen.getByText('2023-08-02: 950')).toBeTruthy();
        expect(getAccountBalanceHistory).toHaveBeenCalledWith('account-2');
    });
});
