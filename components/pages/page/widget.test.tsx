import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import WidgetComponent from './widget';

describe('WidgetComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(
            <WidgetComponent title="Widget title">
                <span aria-label="Widget content">Content</span>
            </WidgetComponent>,
        );
        const element = await screen.locator.getByLabelText('Widget content');
        expect(element.elements().length).toBe(1);
    });
});
