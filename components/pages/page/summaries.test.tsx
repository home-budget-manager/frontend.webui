import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import SummariesComponent from './summaries';

describe('SummariesComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<SummariesComponent />);
        const element = await screen.locator.getByText('Total Balance');
        expect(element.elements().length).toBeGreaterThan(0);
    });
});
