import * as model from "./model";
import { apiClientPromise, IApiClientFactory } from '@/api/api-client-factory';

export interface Connector {
    getOperationsByGroup(
        accountId: string,
        groupType: model.OperationGroupingType,
        params: model.GetOperationsInGroupParameters): Promise<model.OperationsInGroup[]>;
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
        return apiClient.getClient().get(`/api/groupedOperations/account/${accountId}/groupType/${groupType}`, { params })
            .then(response => response.data)
            .then(data => data as model.OperationsInGroup[]);
    }
}

export function createConnector(): Connector {
    return new ConnectorImpl(apiClientPromise);
}

export const groupedOperationsConnector: Connector = createConnector();