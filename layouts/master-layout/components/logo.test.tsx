import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import Logo from './logo';

describe('Logo', () => {
    test('renders Logo component', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <Logo />
            </NextIntlClientProvider>
        );
        expect(screen).toBeDefined();
    });
});