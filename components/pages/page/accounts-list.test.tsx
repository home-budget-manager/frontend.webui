import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import AccountsListComponent from './accounts-list';
import { NextIntlClientProvider } from 'next-intl';

describe('AccountsListComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <AccountsListComponent />
        </NextIntlClientProvider>);
        const element = await screen.locator.getByText('Components/Pages/Page/AccountsList.title');
        expect(element.elements().length).toBe(1);
    });
});
