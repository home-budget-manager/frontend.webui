import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import Panel from './panel';

describe('Panel', () => {
    test('renders correctly', async () => {
        const screen = await render(
            <Panel title="Panel title">
                <span aria-label="Panel content">Content</span>
            </Panel>,
        );
        const element = await screen.locator.getByLabelText('Panel content');
        expect(element.elements().length).toBe(1);
    });
});
