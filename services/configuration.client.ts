export interface ApplicationConfiguration {
    apiRoot: string;
}

let configurationPromise: Promise<ApplicationConfiguration> | undefined;

export function getClientConfiguration(): Promise<ApplicationConfiguration> {
    configurationPromise ??= fetch('/configuration.json').then(async (response) => {
        console.log("Fetching configuration...");
        if (!response.ok) {
            console.error(`Failed to fetch configuration: ${response.status} ${response.statusText}`);
            throw new Error(`Unable to load configuration: ${response.status} ${response.statusText}`);
        }

        console.log("Configuration fetched successfully.", response);
        return response.json() as Promise<ApplicationConfiguration>;
    });

    return configurationPromise;
}