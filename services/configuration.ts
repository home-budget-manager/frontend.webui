export interface ApplicationConfiguration {
    apiRoot: string;
}

let configurationPromise: Promise<ApplicationConfiguration> | undefined;

export function getClientConfiguration(): Promise<ApplicationConfiguration> {
    configurationPromise ??= fetch('/configuration.json').then(async (response) => {
        if (!response.ok) {
            console.error(`Failed to fetch configuration: ${response.status} ${response.statusText}`);
        }

        return response.json() as Promise<ApplicationConfiguration>;
    });

    return configurationPromise;
}