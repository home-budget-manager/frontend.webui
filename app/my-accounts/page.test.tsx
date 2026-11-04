import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import MyAccountsPage from './page';
import { NextIntlClientProvider } from 'next-intl';

vi.mock('@/services/app/my-accounts.service', () => ({
    myAccountsService: {
        getAccounts: vi.fn().mockResolvedValue([]),
    },
}));

describe('MyAccountsPage', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <MyAccountsPage />
        </NextIntlClientProvider>);
        const element = await screen.locator.getByRole('heading', { name: 'App/MyAccounts/Page.title' });
        expect(element.elements().length).toBe(1);
    });
});
