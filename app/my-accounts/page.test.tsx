import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import MyAccountsPage from './page';

describe('MyAccountsPage', () => {
    test('renders correctly', async () => {
        const screen = await render(<MyAccountsPage />);
        const element = await screen.locator.getByRole('heading', { name: 'Your accounts' });
        expect(element.elements().length).toBe(1);
    });
});
