import * as model from "./model";

export interface Connector {
    getAccounts(): Promise<model.AccountData[]>;
    getAccountDetails(accountId: string): Promise<model.AccountData>;
    getAccountOperationsSummary(accountId: string): Promise<model.OperationsSummary>;
    getAccountBalanceHistory(accountId: string, from: Date, to: Date): Promise<model.AccountBalanceHistory>;
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

    async getAccountDetails(accountId: string): Promise<model.AccountData> {
        const accounts = await this.getAccounts();
        return accounts.find(account => account.id === accountId)!;
    }

    async getAccountOperationsSummary(accountId: string): Promise<model.OperationsSummary> {
        // Simulate fetching data from an API or database
        return Promise.resolve({
            incomes: {amount: 5050, count: 4 },
            expenses: {amount: 1640.91, count: 3 },
            transfersIncoming: {amount: 28.5, count: 1 },
            transfersOutgoing: {amount: 1028.5, count: 1 },
        });
    }

    async getAccountBalanceHistory(accountId: string, from: Date, to: Date): Promise<model.AccountBalanceHistory> {
        let balanceHistory: model.BalanceHistoryEntry[] = [];
        let currentBalance = 12345;
        for(let date = new Date(from); date <= to; date.setDate(date.getDate() + 1)) {
            balanceHistory.push({
                date: date.toISOString().split('T')[0],
                balance: currentBalance,
            });
            currentBalance += Math.floor(Math.random() * 600 - 500);
        }

        return Promise.resolve({
            accountId: accountId,
            currency: "USD",
            balanceHistory: balanceHistory,
        });
    }
}

export function createConnector(): Connector {
    return new ConnectorImpl();
}

export const myAccountsConnector: Connector = createConnector();