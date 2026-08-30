import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import HeaderComponent from './header';
import { NextIntlClientProvider } from 'next-intl';

describe('HeaderComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <HeaderComponent setSidebarOpen={() => { }} sidebarOpen={true} />
        </NextIntlClientProvider>);
        const element = await screen.locator.getByLabelText('Components/Pages/Layout/Header.toggleMenu');
        expect(element.elements().length).toBeGreaterThan(0);
    });
});
