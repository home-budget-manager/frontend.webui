import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import TableComponent from './table';

describe('TableComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(
            <TableComponent
                columns={["A", "B"]}
                rows={[[<span key="r1c1">Cell 1</span>, <span key="r1c2">Cell 2</span>]]}
            />,
        );
        const element = await screen.locator.getByText('Cell 1');
        expect(element.elements().length).toBe(1);
    });
});
