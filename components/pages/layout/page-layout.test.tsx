import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import PageLayoutComponent from './page-layout';
import { NextIntlClientProvider } from 'next-intl';

describe('PageLayoutComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <PageLayoutComponent><span aria-label="Test">Content</span></PageLayoutComponent>
            </NextIntlClientProvider>);
        const element = await screen.locator.getByLabelText('Test');
        expect(element.elements().length).toBe(1);
        expect(element.elements()[0].innerHTML).toBe('Content');
    });
});
