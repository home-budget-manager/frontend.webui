import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import SideMenuComponent from './sidemenu';

describe('SideMenuComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<SideMenuComponent sidebarOpen={true} />);
        const element = await screen.locator.getByRole('navigation', { name: 'Main menu' });
        expect(element.elements().length).toBe(1);
        expect(element.elements()[0].getAttribute('aria-expanded')).toBe('true');
    });

    test('renders notifies accessibility about not being expanded', async () => {
        const screen = await render(<SideMenuComponent sidebarOpen={false} />);
        const element = await screen.locator.getByRole('navigation', { name: 'Main menu' });
        expect(element.elements().length).toBe(1);
        expect(element.elements()[0].getAttribute('aria-expanded')).toBe('false');
    });
});