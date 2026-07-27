import { render } from 'vitest-browser-react';
import { expect, test } from 'vitest';

import SideMenuComponent from './sidemenu';

test('SideMenuComponent renders correctly', async () => {
    const screen = await render(<SideMenuComponent sidebarOpen={true} />);
    const element = await screen.locator.getByRole('navigation', { name: 'Main menu' });
    expect(element.elements().length).toBe(1);
    expect(element.elements()[0].getAttribute('aria-expanded')).toBe('true');
});

test('SideMenuComponent renders notifies accessibility about not being expanded', async () => {
    const screen = await render(<SideMenuComponent sidebarOpen={false} />);
    const element = await screen.locator.getByRole('navigation', { name: 'Main menu' });
    expect(element.elements().length).toBe(1);
    expect(element.elements()[0].getAttribute('aria-expanded')).toBe('false');
});
