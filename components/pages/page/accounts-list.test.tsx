import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import AccountsListComponent from './accounts-list';

describe('AccountsListComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<AccountsListComponent />);
        const element = await screen.locator.getByText('List of Accounts');
        expect(element.elements().length).toBe(1);
    });
});
