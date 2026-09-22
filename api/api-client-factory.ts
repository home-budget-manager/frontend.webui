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

let apiClientPromiseInstance: Promise<ApiClient> | undefined;

function getApiClientPromise(): Promise<ApiClient> {
    apiClientPromiseInstance ??= createApiClient();
    return apiClientPromiseInstance;
}

class DeferredApiClientPromise implements Promise<ApiClient> {
    public readonly [Symbol.toStringTag] = 'Promise';

    public then<TResult1 = ApiClient, TResult2 = never>(
        onfulfilled?: ((value: ApiClient) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
    ): Promise<TResult1 | TResult2> {
        return getApiClientPromise().then(onfulfilled, onrejected);
    }

    public catch<TResult = never>(
        onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null
    ): Promise<ApiClient | TResult> {
        return getApiClientPromise().catch(onrejected);
    }

    public finally(onfinally?: (() => void) | null): Promise<ApiClient> {
        return getApiClientPromise().finally(onfinally ?? undefined);
    }
}

export const apiClientPromise: Promise<ApiClient> = new DeferredApiClientPromise();