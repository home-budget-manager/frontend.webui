import { render } from 'vitest-browser-react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { numbersService } from '@services/numbers';
import { myAccountsService } from '@/services/app/my-accounts.service';
import PeriodSummary from './period-summary';

vi.mock('@/services/app/my-accounts.service', () => ({
    myAccountsService: {
        getAccountOperationsSummary: vi.fn(),
    },
}));

vi.mock('@services/numbers', () => ({
    numbersService: {
        formatCurrency: vi.fn((value: number) => `$${value}`),
    },
}));

const getAccountOperationsSummary = vi.mocked(myAccountsService.getAccountOperationsSummary);
const formatCurrency = vi.mocked(numbersService.formatCurrency);

describe('PeriodSummary', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders a loading state while data is being fetched', async () => {
        let resolveData: (value: {
            incomes: { amount: number; count: number };
            expenses: { amount: number; count: number };
            transfersIncoming: { amount: number; count: number };
            transfersOutgoing: { amount: number; count: number };
        }) => void = () => undefined;

        getAccountOperationsSummary.mockReturnValue(new Promise(resolve => {
            resolveData = resolve;
        }));

        const screen = await render(<PeriodSummary accountId="account-1" />);

        expect(screen.getByText('Loading operations summary...')).toBeTruthy();
        expect(getAccountOperationsSummary).toHaveBeenCalledWith('account-1');

        resolveData({
            incomes: { amount: 1000, count: 2 },
            expenses: { amount: 250, count: 3 },
            transfersIncoming: { amount: 100, count: 1 },
            transfersOutgoing: { amount: 50, count: 1 },
        });
        await screen.getByText('Current period summary');
    });

    test('renders summary rows and totals from service data', async () => {
        getAccountOperationsSummary.mockResolvedValue({
            incomes: { amount: 1000, count: 2 },
            expenses: { amount: 250, count: 3 },
            transfersIncoming: { amount: 100, count: 1 },
            transfersOutgoing: { amount: 50, count: 1 },
        });

        const screen = await render(<PeriodSummary accountId="account-2" />);

        await screen.getByText('Current period summary');
        expect(screen.getByText('Operation type')).toBeTruthy();
        expect(screen.getByText('Income')).toBeTruthy();
        expect(screen.getByText('Expenses')).toBeTruthy();
        expect(screen.getByText('Transfers (incoming)')).toBeTruthy();
        expect(screen.getByText('Transfers (outgoing)')).toBeTruthy();

        expect(screen.getByText('$1400')).toBeTruthy();
        expect(screen.getByText('7')).toBeTruthy();

        expect(formatCurrency).toHaveBeenCalled();
        expect(getAccountOperationsSummary).toHaveBeenCalledWith('account-2');
    });
});
