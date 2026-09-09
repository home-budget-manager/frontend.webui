import * as model from "./model";
import { apiClientPromise, IApiClientFactory } from '@/api/api-client-factory';

export interface Connector {
    getAccounts(): Promise<model.AccountData[]>;
    getAccountDetails(accountId: string): Promise<model.AccountData>;
    getAccountOperationsSummary(accountId: string): Promise<model.OperationsSummary>;
    getAccountBalanceHistory(accountId: string, from: Date, to: Date): Promise<model.AccountBalanceHistory>;
}

export class ConnectorImpl implements Connector {
    constructor(
        private apiClientPromise: Promise<IApiClientFactory>
    ) {
    }

    async getAccounts(): Promise<model.AccountData[]> {
        const apiClient = await this.apiClientPromise;
        return apiClient.getClient().get('/api/accounts')
            .then(response => response.data)
            .then(data => data as model.AccountData[]);
    }

    async getAccountDetails(accountId: string): Promise<model.AccountData> {
        const apiClient = await this.apiClientPromise;
        return apiClient.getClient().get(`/api/accounts/${accountId}`)
            .then(response => response.data)
            .then(data => data as model.AccountData);
    }

    async getAccountOperationsSummary(accountId: string): Promise<model.OperationsSummary> {
        const apiClient = await this.apiClientPromise;
        return apiClient.getClient().get(`/api/accounts/${accountId}/operationsSummary`)
            .then(response => response.data)
            .then(data => data as model.OperationsSummary);
    }

    async getAccountBalanceHistory(accountId: string, from: Date, to: Date): Promise<model.AccountBalanceHistory> {
        const apiClient = await this.apiClientPromise;
        return apiClient.getClient().get(`/api/accounts/${accountId}/balanceHistory`, {
            params: {
                from: from.toISOString(),
                to: to.toISOString()
            }
        })
            .then(response => response.data)
            .then(data => data as model.AccountBalanceHistory);
    }
}

export function createConnector(): Connector {
    return new ConnectorImpl(apiClientPromise);
}

export const myAccountsConnector: Connector = createConnector();