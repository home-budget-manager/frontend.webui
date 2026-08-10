import { numbersState, Configuration } from "@/state/numbers";

export interface NumbersService {
    formatCurrency(n: number): string;

    formatCurrency(n: number, currency: string): string;
}

export class NumbersServiceImpl implements NumbersService {
    private configuration: Configuration;
    private currencyFormatter: Intl.NumberFormat;
    constructor(configuration: Configuration) {
        this.configuration = configuration;
        this.currencyFormatter = new Intl.NumberFormat(this.configuration.locale, {
            style: "currency",
            currency: this.configuration.currency,
        });
    }

    formatCurrency(n: number): string;
    formatCurrency(n: number, currency: string): string;

    formatCurrency(n: number, currency?: string): string {
        if (currency) {
            return new Intl.NumberFormat(this.configuration.locale, {
                style: "currency",
                currency: currency,
            }).format(n);
        }
        return this.currencyFormatter.format(n);
    }
}

export function createNumbersService(
    configuration?: Configuration,
    readConfiguration: () => Configuration = () => numbersState().configuration,
): NumbersService {
    return new NumbersServiceImpl(configuration ?? readConfiguration());
}

export const numbersService: NumbersService = createNumbersService();
