import { render } from 'vitest-browser-react';
import { describe, expect, test } from 'vitest';

import WidgetsComponent from './widgets';
import { NextIntlClientProvider } from 'next-intl';

describe('WidgetsComponent', () => {
    test('renders correctly', async () => {
        const screen = await render(<NextIntlClientProvider locale='en'>
            <WidgetsComponent />
        </NextIntlClientProvider>);
        const element = await screen.locator.getByText('Components/Pages/Page/LastOperations.title');
        expect(element.elements().length).toBe(1);
    });
});
