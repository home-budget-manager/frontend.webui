import * as model from "./model";

export interface Connector {
    getOperationsByGroup(accountId: string, groupType: model.OperationGroupingType, period: string): Promise<model.OperationsInGroup[]>;
}

export class ConnectorImpl implements Connector {
    async getOperationsByGroup(accountId: string, groupType: model.OperationGroupingType, period: string): Promise<model.OperationsInGroup[]> {
        // Simulate fetching data from an API or database
        return Promise.resolve([
            {
                groupType: groupType,
                groupId: "1",
                groupName: "Food",
                operationsCount: 10,
                operationsTotalAmount: 200,
                currency: "USD",
                period: period
            },
            {
                groupType: groupType,
                groupId: "2",
                groupName: "Transport",
                operationsCount: 5,
                operationsTotalAmount: 100,
                currency: "USD",
                period: period
            },
            {
                groupType: groupType,
                groupId: "3",
                groupName: "Entertainment",
                operationsCount: 8,
                operationsTotalAmount: 150,
                currency: "USD",
                period: period
            },
            {
                groupType: groupType,
                groupId: "4",
                groupName: "Utilities",
                operationsCount: 3,
                operationsTotalAmount: 75,
                currency: "USD",
                period: period
            }
        ]);
    }
}

export function createConnector(): Connector {
    return new ConnectorImpl();
}

export const operationsConnector: Connector = createConnector();