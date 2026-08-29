import * as model from "./model";

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
    async getOperationsByGroup(
        accountId: string,
        groupType: model.OperationGroupingType,
        params: model.GetOperationsInGroupParameters): Promise<model.OperationsInGroup[]> {
        // Simulate fetching data from an API or database
        return Promise.resolve([
            {
                groupType: groupType,
                groupId: "1",
                groupName: "Food",
                operationsCount: 10,
                operationsTotalAmount: 200,
                currency: "USD",
                period: params.period
            },
            {
                groupType: groupType,
                groupId: "2",
                groupName: "Transport",
                operationsCount: 5,
                operationsTotalAmount: 100,
                currency: "USD",
                period: params.period
            },
            {
                groupType: groupType,
                groupId: "3",
                groupName: "Entertainment",
                operationsCount: 8,
                operationsTotalAmount: 150,
                currency: "USD",
                period: params.period
            },
            {
                groupType: groupType,
                groupId: "4",
                groupName: "Utilities",
                operationsCount: 3,
                operationsTotalAmount: 75,
                currency: "USD",
                period: params.period
            }
        ]);
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
    return new ConnectorImpl();
}

export const operationsConnector: Connector = createConnector();