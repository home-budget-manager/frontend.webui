interface Configuration {
    locale: string;
    currency: string;
}

const defaultConfiguration: Configuration = {
    locale: "pl-PL",
    currency: "PLN",
};

export function useNumbersState() {
    let configuration: Configuration = defaultConfiguration;
    return { configuration };
}
