import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import MyAccountPage, { MyAccountPageParameters } from './page';
import { NextIntlClientProvider } from 'next-intl';

describe('MyAccountDetailsPage', () => {
    test('renders correctly', async () => {
        const params: Promise<MyAccountPageParameters> = Promise.resolve({ accountId: '2' });
        const screen = await render(<NextIntlClientProvider locale='en'><MyAccountPage params={ params } /></NextIntlClientProvider>);
        const element = await screen.locator.getByText('Account name');
        expect(element.elements().length).toBe(1);
    });
});
