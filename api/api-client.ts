import type { ApplicationConfiguration } from '@services/configuration.types';

export interface IApiClient {
}

export class ApiClient {
    private configuration: ApplicationConfiguration;

    constructor(configuration: ApplicationConfiguration) {
        this.configuration = configuration;
    }

    public getApiRoot(): string {
        return this.configuration.apiRoot;
    }
}
