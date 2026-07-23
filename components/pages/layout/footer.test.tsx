import { render } from 'vitest-browser-react';
import { expect, test } from 'vitest';

import FooterComponent from './footer';

test('FooterComponent renders correctly', async () => {
    const screen = await render(<FooterComponent />);
    const element = await screen.locator.getByText(new Date().getFullYear().toString());
    expect(element.elements().length).toBeGreaterThan(0);
});
