import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import HighlightedAccounts from './highlighted-accounts';

vi.mock('./last-account-operations', () => ({
    default: () => {
        return <h1>LastOperations</h1>
    },
}));

describe('HighlightedAccounts', () => {
    test('renders HighlightedAccounts component', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'><HighlightedAccounts /></NextIntlClientProvider>);
        expect(screen).toBeDefined();
        const chartHeader = screen.locator.getByRole('heading', { name: "LastOperations" });
        expect(chartHeader).toBeDefined();
        expect(chartHeader.elements().length).toBe(5);
    });
});