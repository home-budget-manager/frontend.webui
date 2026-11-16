import { render, RenderResult } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';

import UserInfo from './user-info';

describe('UserInfo', () => {
    test('renders user info', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <UserInfo />
            </NextIntlClientProvider>
        );
        const element = screen.getByText('User Name');
        expect(element.elements().length).toBe(1);
    });
});
