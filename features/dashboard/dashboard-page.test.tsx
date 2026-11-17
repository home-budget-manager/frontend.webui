import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import DashboardPage from './dashboard-page';

vi.mock('./components/highlighted-accounts', () => ({
    default: () => {
        return <h1>HighlightedComponents</h1>
    },
}));

vi.mock('./components/accounts-chart', () => ({
    default: () => {
        return <h1>AccountsChart</h1>
    },
}));

vi.mock('./components/expenses-budgets-results', () => ({
    default: () => {
        return <h1>ExpensesBudgetsResults</h1>
    },
}));

vi.mock('./components/incomes-budgets-results', () => ({
    default: () => {
        return <h1>IncomesBudgetsResults</h1>
    },
}));

describe('DashboardPage', () => {
    test('renders DashboardPage component', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'><DashboardPage /></NextIntlClientProvider>);
        expect(screen).toBeDefined();
        const highlightedComponents = screen.locator.getByRole('heading', { name: "HighlightedComponents" });
        expect(highlightedComponents.elements().length).toBe(1);
        const accountsCharts = screen.locator.getByRole('heading', { name: "AccountsChart" });
        expect(accountsCharts.elements().length).toBe(1);
        const budgetsResults = screen.locator.getByRole('heading', { name: "ExpensesBudgetsResults" });
        expect(budgetsResults.elements().length).toBe(1);
        const incomesBudgetsResults = screen.locator.getByRole('heading', { name: "IncomesBudgetsResults" });
        expect(incomesBudgetsResults.elements().length).toBe(1);
    });
});