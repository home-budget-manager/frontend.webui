import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import Page from './page';

describe('Page', () => {
    test('renders account page', async () => {
        const params = { params: Promise.resolve({ accountId: "account_1" }) };

        const screen = await render(await Page(params));
        const element = screen.getByText('Account account_1');
        expect(element.elements().length).toBe(1);
    });
});