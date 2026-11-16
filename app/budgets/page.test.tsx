import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import Page from './page';

describe('Page', () => {
    test('renders budgets page', async () => {
        const screen = await render(Page());
        const element = screen.getByText("Budgets Page");
        expect(element.elements().length).toBe(1);
    });
});