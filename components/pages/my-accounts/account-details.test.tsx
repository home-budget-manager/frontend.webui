import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import AccountDetailsComponent from './account-details';
import { NextIntlClientProvider } from 'next-intl';

describe('AccountDetailsComponent', () => {
    test('renders correctly', async () => {
        const accountData = {
            id: '1',
            name: 'Savings account',
            type: 'Savings',
            balance: 1000,
            currency: 'USD',
        };

        const screen = await render(<NextIntlClientProvider locale='en'>
            <AccountDetailsComponent accountData={accountData} />
        </NextIntlClientProvider>,
        );
        expect(screen.getByText('Savings account')).toBeTruthy();
        expect(screen.getByText('Savings')).toBeTruthy();
        expect(screen.getByText('1000')).toBeTruthy();
        expect(screen.getByText('USD')).toBeTruthy();
    });
});
