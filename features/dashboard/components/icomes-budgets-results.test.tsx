import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import IncomesBudgetsResults from './incomes-budgets-results';

vi.mock("./budgets-results", () => ({
    default: () => <div>Mocked Budget Results</div>
}));

describe('IncomesBudgetsResults', () => {
    test('renders correctly', async () => {
        const screen = await render(
            <NextIntlClientProvider locale="en" >
                <IncomesBudgetsResults />
            </NextIntlClientProvider>
        );
        const chartHeader = screen.locator.getByRole('heading', { name: "features/dashboard/components/incomes-budgets-results.title" });
        expect(chartHeader).toBeDefined();
        expect(chartHeader.elements().length).toBe(1);
        const mockedBudgetResults = screen.locator.getByText('Mocked Budget Results');
        expect(mockedBudgetResults).toBeDefined();
        expect(mockedBudgetResults.elements().length).toBe(1);
    });
});
