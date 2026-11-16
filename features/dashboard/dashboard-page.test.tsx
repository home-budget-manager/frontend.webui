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

vi.mock('./components/budgets-results', () => ({
    default: () => {
        return <h1>BudgetsResults</h1>
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
        const budgetsResults = screen.locator.getByRole('heading', { name: "BudgetsResults" });
        expect(budgetsResults.elements().length).toBe(1);
    });
});