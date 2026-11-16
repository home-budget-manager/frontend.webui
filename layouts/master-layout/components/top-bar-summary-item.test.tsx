import { render, RenderResult } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import TopBarSummary from './top-bar-summary-item';

describe('TopBarSummary', () => {
    test('renders correctly', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <TopBarSummary label="Summary label" value="Summary value" />
            </NextIntlClientProvider>
        );
        const labelElement = screen.getByText('Summary label');
        const valueElement = screen.getByText('Summary value');
        expect(labelElement).toBeDefined();
        expect(valueElement).toBeDefined();
        expect(labelElement.elements().length).toBe(1);
        expect(valueElement.elements().length).toBe(1);
    });
});