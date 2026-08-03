export interface Configuration {
    locale: string;
    currency: string;
}

const defaultConfiguration: Configuration = {
    locale: "pl-PL",
    currency: "PLN",
};

export function numbersState() {
    const configuration: Configuration = defaultConfiguration;
    return { configuration };
}
