import * as model from "./model";
import { apiClientPromise, IApiClientFactory } from '@/api/api-client-factory';

export interface Connector {
    searchOperations(
        params: model.SearchOperationsParameters
    ): Promise<model.SearchOperationsResult>;
}

export class ConnectorImpl implements Connector {
    constructor(
        private apiClientPromise: Promise<IApiClientFactory>
    ) {
    }

    async searchOperations(
        params: model.SearchOperationsParameters
    ): Promise<model.SearchOperationsResult> {
        const apiClient = await this.apiClientPromise;
        return apiClient.getClient().get(`/api/operations`, { params })
            .then(response => response.data)
            .then(data => data as model.SearchOperationsResult);
    }
}

export function createConnector(): Connector {
    return new ConnectorImpl(apiClientPromise);
}

export const operationsConnector: Connector = createConnector();