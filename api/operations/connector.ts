import * as model from "./model";
import { apiClientPromise, IApiClientFactory } from '@/api/api-client-factory';

export interface Connector {
    getOperationsByGroup(
        accountId: string,
        groupType: model.OperationGroupingType,
        params: model.GetOperationsInGroupParameters): Promise<model.OperationsInGroup[]>;
    searchOperations(
        params: model.SearchOperationsParameters
    ): Promise<model.SearchOperationsResult>;
}

export class ConnectorImpl implements Connector {
    constructor(
        private apiClientPromise: Promise<IApiClientFactory>
    ) {
    }
    async getOperationsByGroup(
        accountId: string,
        groupType: model.OperationGroupingType,
        params: model.GetOperationsInGroupParameters): Promise<model.OperationsInGroup[]> {
        const apiClient = await this.apiClientPromise;
        return apiClient.getClient().get(`/api/operations/${accountId}/groupType/${groupType}`, { params })
            .then(response => response.data)
            .then(data => data as model.OperationsInGroup[]);
    }

    async searchOperations(
        params: model.SearchOperationsParameters
    ): Promise<model.SearchOperationsResult> {
        // Simulate an asynchronous operation, e.g., fetching data from an API or database
        return {
            totalCount: 3,
            items: [
                {
                    id: "1",
                    date: new Date(),
                    operationType: "expense",
                    sourceAccountId: "1",
                    targetAccountId: "2",
                    title: "Grocery Shopping",
                    amount: -50,
                    currency: "USD",
                    categoryId: "1",
                    budgetId: "1"
                },
                {
                    id: "2",
                    date: new Date(),
                    operationType: "transfer",
                    sourceAccountId: "2",
                    targetAccountId: "3",
                    title: "Transfer to savings account",
                    amount: -520,
                    currency: "USD",
                    categoryId: "2",
                    budgetId: "2"
                },
                {
                    id: "3",
                    date: new Date(),
                    operationType: "income",
                    sourceAccountId: "5",
                    targetAccountId: "1",
                    title: "Salary",
                    amount: 12520,
                    currency: "USD",
                    categoryId: "3",
                    budgetId: "3"
                },
            ]
        };
    }
}

export function createConnector(): Connector {
    return new ConnectorImpl(apiClientPromise);
}

export const operationsConnector: Connector = createConnector();