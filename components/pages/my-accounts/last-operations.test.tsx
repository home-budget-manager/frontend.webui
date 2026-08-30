import { render } from 'vitest-browser-react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { numbersService } from '@services/numbers';
import { myAccountsService } from '@/services/app/my-accounts.service';
import LastOperations from './last-operations';
import * as models from "@/types/app/my-accounts/page";

vi.mock('@/services/app/my-accounts.service', () => ({
    myAccountsService: {
        getLastOperations: vi.fn(),
    },
}));

vi.mock('@services/numbers', () => ({
    numbersService: {
        formatCurrency: vi.fn((value: number) => `$${value}`),
    },
}));

const getLastOperations = vi.mocked(myAccountsService.getLastOperations);
const formatCurrency = vi.mocked(numbersService.formatCurrency);

describe('LastOperations', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders a loading state and then the operations returned by the service', async () => {
        let resolveData: (value: models.OperationsListItem[]) => void = () => undefined;

        getLastOperations.mockReturnValue(new Promise(resolve => {
            resolveData = resolve;
        }));

        const screen = await render(<NextIntlClientProvider locale='en'>
            <LastOperations accountId="account-1" />
        </NextIntlClientProvider>);

        expect(screen.getByText('Loading last operations...')).toBeTruthy();
        expect(getLastOperations).toHaveBeenCalledWith('account-1');

        resolveData([
            {
                id: '1',
                date: new Date('2024-02-01T00:00:00Z'),
                operationType: 'expense',
                sourceAccount: 'account-1',
                targetAccount: 'store-1',
                title: 'Groceries',
                amount: 125.5,
                currency: 'USD',
                category: 'Food',
                budget: 'Monthly',
            },
        ]);

        await vi.waitFor(() => {
            expect(screen.getByText('Last Operations')).toBeTruthy();
            expect(screen.getByText('Groceries')).toBeTruthy();
            expect(formatCurrency).toHaveBeenCalledWith(125.5);
        });
    });
});
