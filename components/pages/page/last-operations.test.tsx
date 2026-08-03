import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import LastOperationsComponent from './last-operations';

describe('LastOperationsComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<LastOperationsComponent />);
        const element = await screen.locator.getByText('Last Operations');
        expect(element.elements().length).toBe(1);
    });
});
