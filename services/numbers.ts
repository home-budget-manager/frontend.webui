import { useNumbersState } from "@/state/numbers";

export interface NumbersService {
    formatCurrency(n: number): string;
}

class NumbersServiceImpl implements NumbersService {
    private configuration: ReturnType<typeof useNumbersState>["configuration"];
    private currencyFormatter: Intl.NumberFormat;
    constructor() {
        const { configuration: config } = useNumbersState();
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
