import { describe, expect, test } from 'vitest';

import { numbersState } from './numbers';

describe('numbersState', () => {
    test('returns default configuration', () => {
        const { configuration } = numbersState();
        expect(configuration.locale).toBe('pl-PL');
        expect(configuration.currency).toBe('PLN');
    });
});