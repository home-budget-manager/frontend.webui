import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import FooterComponent from './footer';

describe('FooterComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<FooterComponent />);
        const element = await screen.locator.getByText(new Date().getFullYear().toString());
        expect(element.elements().length).toBeGreaterThan(0);
    });
});
