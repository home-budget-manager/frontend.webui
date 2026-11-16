import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import Page from './page';

describe('Page', () => {
    test('renders transaction page', async () => {
        const params = { params: Promise.resolve({ transactionId: "transaction_1" }) };

        const screen = await render(await Page(params));
        const element = screen.getByText('Transaction transaction_1');
        expect(element.elements().length).toBe(1);
    });
});