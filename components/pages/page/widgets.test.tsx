import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import WidgetsComponent from './widgets';

describe('WidgetsComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<WidgetsComponent />);
        const element = await screen.locator.getByText('List of Accounts');
        expect(element.elements().length).toBe(1);
    });
});
