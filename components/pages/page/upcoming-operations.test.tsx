import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import UpcomingOperationsComponent from './upcoming-operations';

describe('UpcomingOperationsComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<UpcomingOperationsComponent />);
        const element = await screen.locator.getByText('Upcoming Operations');
        expect(element.elements().length).toBe(1);
    });
});
