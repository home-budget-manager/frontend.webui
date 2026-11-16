import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import LastAccountOperations from './last-account-operations';

describe('LastAccountOperations', () => {
    test('renders LastAccountOperations component', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'><LastAccountOperations accountId='1' /></NextIntlClientProvider>);
        expect(screen).toBeDefined();
        const chartHeader = screen.locator.getByRole('heading', { name: "Account 1" });
        expect(chartHeader).toBeDefined();
        expect(chartHeader.elements().length).toBe(1);
    });
});