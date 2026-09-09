import { ApplicationConfiguration, getClientConfiguration } from '@/services/configuration';
import axios, { AxiosInstance } from 'axios';

export interface IApiClientFactory {
    getClient(): AxiosInstance;
}

export class ApiClient {
    private configuration: ApplicationConfiguration;

    constructor(configuration: ApplicationConfiguration) {
        this.configuration = configuration;
    }

    public getClient(): AxiosInstance {
        return this.createClient();
    }

    private createClient() {
        const client = axios.create({
            baseURL: this.getApiRoot(),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return client;
    }

    private getApiRoot(): string {
        return this.configuration.apiRoot;
    }
}

export async function createApiClient(): Promise<ApiClient> {
    const configuration = await getClientConfiguration();
    return new ApiClient(configuration);
}

export const apiClientPromise: Promise<ApiClient> = createApiClient();