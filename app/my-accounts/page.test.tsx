import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import MyAccountsPage from './page';
import { NextIntlClientProvider } from 'next-intl';

describe('MyAccountsPage', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <MyAccountsPage />
        </NextIntlClientProvider>);
        const element = await screen.locator.getByRole('heading', { name: 'App/MyAccounts/Page.title' });
        expect(element.elements().length).toBe(1);
    });
});
