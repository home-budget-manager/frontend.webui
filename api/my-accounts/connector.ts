import * as model from "./model";

export interface Connector {
    getAccounts(): Promise<model.AccountData[]>;
}

export class ConnectorImpl implements Connector {
    async getAccounts(): Promise<model.AccountData[]> {
        // Simulate fetching data from an API or database
        return Promise.resolve([
            { id: "1", name: "Checking Account", type: "checking", balance: 3421.12, currentPeriodChange: -242.22, currency: "USD", isActive: true },
            { id: "2", name: "Savings Account", type: "savings", balance: 23421.12, currentPeriodChange: 1544.12, currency: "USD", isActive: false },
            { id: "3", name: "Investment Account", type: "savings", balance: 15000.00, currentPeriodChange: 500.00, currency: "PLN", isActive: true },
        ]);
    }
}

export function createConnector(): Connector {
    return new ConnectorImpl();
}

export const myAccountsConnector: Connector = createConnector();