import * as models from "@/types/app/my-accounts/page";

import { myAccountsConnector, Connector } from "@/api/my-accounts/connector";

export interface MyAccountsService {
    getAccounts(): Promise<models.AccountData[]>;
}

export class MyAccountsServiceImpl implements MyAccountsService {
    constructor(private connector: Connector) {}
    async getAccounts(): Promise<models.AccountData[]> {
        return this.connector.getAccounts()
            .then((accounts) => {
                return accounts.map(account => ({
                    id: account.id,
                    name: account.name,
                    type: account.type,
                    balance: account.balance,
                    periodChange: account.currentPeriodChange,
                    currency: account.currency,
                    isActive: account.isActive
                }));
            });
    }
}

export function createMyAccountsService(): MyAccountsService {
    return new MyAccountsServiceImpl(myAccountsConnector);
}

export const myAccountsService: MyAccountsService = createMyAccountsService();