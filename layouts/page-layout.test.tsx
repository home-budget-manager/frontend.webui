import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import PageLayout from './page-layout';

describe('PageLayout', () => {
    test('renders PageLayout component', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <PageLayout title="Test Title" subtitle="Test Subtitle">
                    <p>Test Children</p>
                </PageLayout>
            </NextIntlClientProvider>
        );
        expect(screen).toBeDefined();
        const title = screen.locator.getByRole('heading', { name: "Test Title" });
        expect(title.elements().length).toBe(1);
        const subtitle = screen.locator.getByRole('heading', { name: "Test Subtitle" });
        expect(subtitle.elements().length).toBe(1);
        const children = screen.locator.getByText('Test Children');
        expect(children.elements().length).toBe(1);
    });

    test('renders PageLayout component without subtitle', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <PageLayout title="Test Title">
                    <p>Test Children</p>
                </PageLayout>
            </NextIntlClientProvider>
        );
        expect(screen).toBeDefined();
        const title = screen.locator.getByRole('heading', { name: "Test Title" });
        expect(title.elements().length).toBe(1);
        const subtitle = screen.locator.getByRole('heading', { });
        expect(subtitle.elements().length).toBe(1);
        const children = screen.locator.getByText('Test Children');
        expect(children.elements().length).toBe(1);
    });
});