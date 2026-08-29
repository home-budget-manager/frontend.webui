import { render } from 'vitest-browser-react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { numbersService } from '@services/numbers';
import { myAccountsService } from '@/services/app/my-accounts.service';
import * as models from '@/types/app/my-accounts/page';
import PeriodSummary from './period-summary';
import { NextIntlClientProvider } from 'next-intl';

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
            items: models.SummaryItem[];
        }) => void = () => undefined;

        getAccountOperationsSummary.mockReturnValue(new Promise(resolve => {
            resolveData = resolve;
        }));

        const screen = await render(<NextIntlClientProvider locale='en'><PeriodSummary accountId="account-1" /></NextIntlClientProvider>);

        expect(screen.getByText('Loading operations summary...')).toBeTruthy();
        expect(getAccountOperationsSummary).toHaveBeenCalledWith('account-1');

        resolveData({
            items: [
                { itemType: 'incomes', amount: 1000, count: 2, currency: 'USD' },
                { itemType: 'expenses', amount: 250, count: 3, currency: 'USD' },
                { itemType: 'transfersIncoming', amount: 100, count: 1, currency: 'USD' },
                { itemType: 'transfersOutgoing', amount: 50, count: 1, currency: 'USD' },
            ]
        });
        await screen.getByText('Current period summary');
    });

    test('renders summary rows and totals from service data', async () => {
        getAccountOperationsSummary.mockResolvedValue({
            items: [
                { itemType: 'incomes', amount: 1000, count: 2, currency: 'USD' },
                { itemType: 'expenses', amount: 250, count: 3, currency: 'USD' },
                { itemType: 'transfersIncoming', amount: 100, count: 1, currency: 'USD' },
                { itemType: 'transfersOutgoing', amount: 50, count: 1, currency: 'USD' },
            ],
        });

        const screen = await render(<NextIntlClientProvider locale='en'><PeriodSummary accountId="account-2" /></NextIntlClientProvider>);

        await screen.getByText('Current period summary');
        expect(screen.getByText('Operation type')).toBeTruthy();
        expect(screen.getByText('Incomes')).toBeTruthy();
        expect(screen.getByText('Expenses')).toBeTruthy();
        expect(screen.getByText('Transfers (incoming)')).toBeTruthy();
        expect(screen.getByText('Transfers (outgoing)')).toBeTruthy();

        expect(screen.getByText('$1400')).toBeTruthy();
        expect(screen.getByText('7')).toBeTruthy();

        expect(formatCurrency).toHaveBeenCalled();
        expect(getAccountOperationsSummary).toHaveBeenCalledWith('account-2');
    });
});
