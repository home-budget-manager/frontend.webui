import { render, RenderResult } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import Navigation from './navigation';

describe('Navigation', () => {
    async function expandMenu(screen: RenderResult) {
        const expander = screen.getByRole('listitem').first();
        await expander.click();
    }
    
    test('renders correct number of list items', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <Navigation />
            </NextIntlClientProvider>
        );
        await expandMenu(screen);
        const listItems = screen.locator.getByRole('listitem');
        expect(listItems.elements().length).toBe(8);
    });

    async function rendersNavigationItem(title: string) {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <Navigation />
            </NextIntlClientProvider>
        );
        await expandMenu(screen);
        const fullTitle = `layouts/master-layout/components/navigation.${title}`;
        console.log(fullTitle);
        const listItem = screen.locator.getByRole('link', { name: fullTitle });
        expect(listItem.elements().length).toBe(1);
    }

    test('renders dashboard', async () => {
        await rendersNavigationItem('dashboard');
    });

    test('renders budgets', async () => {
        await rendersNavigationItem('budgets');
    });

    test('renders accounts', async () => {
        await rendersNavigationItem('accounts');
    });

    test('renders transactions', async () => {
        await rendersNavigationItem('transactions');
    });

    test('renders reports', async () => {
        await rendersNavigationItem('reports');
    });
    
    test('renders settings', async () => {
        await rendersNavigationItem('settings');
    });
});