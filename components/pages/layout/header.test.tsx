import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import HeaderComponent from './header';

describe('HeaderComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<HeaderComponent setSidebarOpen={() => { }} />);
        const element = await screen.locator.getByLabelText('Toggle menu');
        expect(element.elements().length).toBeGreaterThan(0);
    });
});
