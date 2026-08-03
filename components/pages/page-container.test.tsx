import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import PageContainerComponent from './page-container';

describe('PageContainerComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(
            <PageContainerComponent title="Dashboard" subtitle="Overview">
                <span aria-label="Page content">Content</span>
            </PageContainerComponent>,
        );

        const title = await screen.locator.getByText('Dashboard');
        const subtitle = await screen.locator.getByText('Overview');
        const content = await screen.locator.getByLabelText('Page content');

        expect(title.elements().length).toBe(1);
        expect(subtitle.elements().length).toBe(1);
        expect(content.elements().length).toBe(1);
    });
});
