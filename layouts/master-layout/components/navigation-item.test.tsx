import { render } from 'vitest-browser-react';
import { describe, expect, test, vi } from 'vitest';

import { NextIntlClientProvider } from 'next-intl';
import { TestTubeDiagonal } from 'lucide-react';

import NavigationItem from './navigation-item';

describe('NavigationItem', () => {
    test('renders NavigationItem component', async () => {
        const screen = await render(
            <NextIntlClientProvider locale='en'>
                <NavigationItem
                    icon={TestTubeDiagonal}
                    title="Test Title"
                    link="/test-link"
                    isExpanded={true} />
            </NextIntlClientProvider>
        );
        expect(screen).toBeDefined();
        const link = screen.locator.getByRole('link', { name: "Test Title" });
        expect(link.elements().length).toBe(1);
        expect(link.elements()[0].firstElementChild?.tagName).toBe('svg');
        expect(link.elements()[0].childNodes[1].textContent).toBe('Test Title');
    });
});