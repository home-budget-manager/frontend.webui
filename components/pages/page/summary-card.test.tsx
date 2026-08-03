import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import SummaryCardComponent from './summary-card';

describe('SummaryCardComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(
            <SummaryCardComponent
                label="Balance"
                value="$123.45"
                change="+1.2%"
                positive={true}
            />,
        );
        const element = await screen.locator.getByText('Balance');
        expect(element.elements().length).toBe(1);
    });
});
