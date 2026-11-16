import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import MasterLayout from './layout';

vi.mock('./components/top-bar', () => ({
    default: () => {
        return <h1>TopBar</h1>
    },
}));

vi.mock('./components/navigation', () => ({
    default: () => {
        return <h1>Navigation</h1>
    },
}));

describe('MasterLayout', () => {
    test('renders MasterLayout component', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <MasterLayout>
                    <p>Test Children</p>
                </MasterLayout>
            </NextIntlClientProvider>
        );
        expect(screen).toBeDefined();
        const topBar = screen.locator.getByRole('heading', { name: "TopBar" });
        expect(topBar.elements().length).toBe(1);
        const navigation = screen.locator.getByRole('heading', { name: "Navigation" });
        expect(navigation.elements().length).toBe(1);
        const children = screen.locator.getByText('Test Children');
        expect(children.elements().length).toBe(1);
    });
});