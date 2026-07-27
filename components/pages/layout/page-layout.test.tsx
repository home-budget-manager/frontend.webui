import { render } from 'vitest-browser-react';
import { expect, test } from 'vitest';

import PageLayoutComponent from './page-layout';

test('PageLayoutComponent renders correctly', async () => {
    const screen = await render(<PageLayoutComponent><span aria-label="Test">Content</span></PageLayoutComponent>);
    const element = await screen.locator.getByLabelText('Test');
    expect(element.elements().length).toBe(1);
    expect(element.elements()[0].innerHTML).toBe('Content');
});
