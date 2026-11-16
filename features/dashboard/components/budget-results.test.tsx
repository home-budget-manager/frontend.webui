import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import BudgetResults from './budgets-results';

describe('BudgetResults', () => {
    test('renders correctly', async () => {
        const screen = await render(
            <NextIntlClientProvider locale="en" >
                <BudgetResults />
            </NextIntlClientProvider>
        );
        const chartHeader = screen.locator.getByRole('heading', { name: "features/dashboard/components/budgets-results.title" });
        expect(chartHeader).toBeDefined();
        expect(chartHeader.elements().length).toBe(1);
    });
});
