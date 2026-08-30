import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import SideMenuComponent from './sidemenu';
import { NextIntlClientProvider } from 'next-intl';

describe('SideMenuComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <SideMenuComponent sidebarOpen={true} />
        </NextIntlClientProvider>);
        const element = screen.locator.getByRole('navigation', { name: 'Components/Pages/Layout/SideMenu.mainMenu' });
        expect(element.elements().length).toBe(1);
    });

    test('renders notifies accessibility about not being expanded', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <SideMenuComponent sidebarOpen={false} />
        </NextIntlClientProvider>);
        const element = screen.locator.getByRole('navigation', { name: 'Components/Pages/Layout/SideMenu.mainMenu' });
        expect(element.elements().length).toBe(1);
        expect(element.elements()[0].getAttribute('aria-label')).toBe('Components/Pages/Layout/SideMenu.mainMenu');
    });
});