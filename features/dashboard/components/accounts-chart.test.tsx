import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import AccountsChart from './accounts-chart';

describe('AccountsChart', () => {
    test('renders AccountsChart component', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'><AccountsChart /></NextIntlClientProvider>);
        expect(screen).toBeDefined();
        const chartHeader = screen.locator.getByRole('heading', { name: "features/dashboard/components/accounts-chart.title" });
        expect(chartHeader).toBeDefined();
        expect(chartHeader.elements().length).toBe(1);
    });
});
