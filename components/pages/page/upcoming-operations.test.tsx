import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import UpcomingOperationsComponent from './upcoming-operations';
import { NextIntlClientProvider } from 'next-intl';

describe('UpcomingOperationsComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <UpcomingOperationsComponent />
        </NextIntlClientProvider>);
        const element = await screen.locator.getByText('Components/Pages/Page/UpcomingOperations.header');
        expect(element.elements().length).toBe(1);
    });
});
