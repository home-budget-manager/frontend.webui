import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import MyAccountPage, { MyAccountPageParameters } from './page';

describe('MyAccountDetailsPage', () => {
    test('renders correctly', async () => {
        const params: Promise<MyAccountPageParameters> = Promise.resolve({ accountId: '2' });
        const screen = await render(<MyAccountPage params={ params } />);
        const element = await screen.locator.getByText('Account name');
        expect(element.elements().length).toBe(1);
    });
});
