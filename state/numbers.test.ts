import { expect, test } from 'vitest';

import { numbersState } from './numbers';

test('numbersState returns default configuration', () => {
    const { configuration } = numbersState();
    expect(configuration.locale).toBe('pl-PL');
    expect(configuration.currency).toBe('PLN');
});