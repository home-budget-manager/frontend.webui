import { describe, expect, test } from 'vitest';

import { createNumbersService } from './numbers';

describe('numbersService', () => {
    test('formats positive values using injected configuration', () => {
        const service = createNumbersService({ locale: 'en-US', currency: 'USD' });
        const value = 1234.56;

        const result = service.formatCurrency(value);
        const expected = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);

        expect(result).toBe(expected);
    });

    test('formats negative values using injected configuration', () => {
        const service = createNumbersService({ locale: 'en-US', currency: 'USD' });
        const value = -987.65;

        const result = service.formatCurrency(value);
        const expected = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);

        expect(result).toBe(expected);
    });

    test('formats zero correctly', () => {
        const service = createNumbersService({ locale: 'pl-PL', currency: 'PLN' });
        const value = 0;

        const result = service.formatCurrency(value);
        const expected = new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
        }).format(value);

        expect(result).toBe(expected);
    });

    test('rounds to currency precision', () => {
        const service = createNumbersService({ locale: 'en-US', currency: 'USD' });
        const value = 10.129;

        const result = service.formatCurrency(value);
        const expected = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);

        expect(result).toBe(expected);
    });

    test('uses configuration reader when no configuration is injected', () => {
        const value = 42;
        const result = createNumbersService(undefined, () => ({ locale: 'de-DE', currency: 'EUR' })).formatCurrency(value);
        const expected = new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);

        expect(result).toBe(expected);
    });
});
