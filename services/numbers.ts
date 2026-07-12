import { numbersState, Configuration } from "@/state/numbers";

export interface NumbersService {
    formatCurrency(n: number): string;
}

class NumbersServiceImpl implements NumbersService {
    private configuration: Configuration;
    private currencyFormatter: Intl.NumberFormat;
    constructor() {
        const { configuration: config } = numbersState();
        this.configuration = config;
        this.currencyFormatter = new Intl.NumberFormat(this.configuration.locale, {
            style: "currency",
            currency: this.configuration.currency,
        });
    }

    formatCurrency(n: number): string {
        return this.currencyFormatter.format(n);
    }
}

export const numbersService: NumbersService = new NumbersServiceImpl();
