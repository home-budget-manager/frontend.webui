import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import LastOperationsComponent from './last-operations';
import { NextIntlClientProvider } from 'next-intl';

describe('LastOperationsComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <LastOperationsComponent />
        </NextIntlClientProvider>);
        const element = await screen.locator.getByText('Components/Pages/Page/LastOperations.title');
        expect(element.elements().length).toBe(1);
    });
});
