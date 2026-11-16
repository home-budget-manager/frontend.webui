import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import Page from './page';

vi.mock("../layouts/page-layout", () => ({
    default: (params: { children: React.ReactNode }) => <div>{params.children}</div>
}));

vi.mock("../features/dashboard/dashboard-page", () => ({
    default: () => <div>Dashboard Page</div>
}));

describe('Page', () => {
    test('renders dashboard page', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <Page />
            </NextIntlClientProvider>
        );
        const element = screen.getByText('Dashboard Page');
        expect(element.elements().length).toBe(1);
    });
});