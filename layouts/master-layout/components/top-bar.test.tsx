import { render, RenderResult } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import TopBar from './top-bar';

vi.mock("./logo", () => ({
    default: () => <div>Logo</div>
}));

vi.mock("./top-bar-summary-item", () => ({
    default: (params: { label: string, value: string }) => <div><div>{params.label}</div><div>{params.value}</div></div>
}));

vi.mock("./user-info", () => ({
    default: () => <div>User Info</div>
}));

describe('TopBar', () => {
    test('renders logo', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <TopBar />
            </NextIntlClientProvider>
        );
        
        const element = screen.getByText('Logo');
        expect(element.elements().length).toBe(1);
    });

    test('renders user info', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <TopBar />
            </NextIntlClientProvider>
        );
        const element = screen.getByText('User Info');
        expect(element.elements().length).toBe(1);
    });

    async function rendersSummaryItem(label: string) {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <TopBar />
            </NextIntlClientProvider>
        );
        const fullTitle = `layouts/master-layout/components/top-bar.${label}`;
        const element = screen.getByText(fullTitle);
        expect(element.elements().length).toBe(1);
    }

    test('renders current period name', async () => {
        await rendersSummaryItem('currentPeriod');
    });

    test('renders current period incomes', async () => {
        await rendersSummaryItem('periodIncomes');
    });

    test('renders current period outcomes', async () => {
        await rendersSummaryItem('periodOutcomes');
    });

    test('renders current period transfers', async () => {
        await rendersSummaryItem('periodTransfers');
    });

    test('renders total value summary', async () => {
        await rendersSummaryItem('totalValue');
    });
});