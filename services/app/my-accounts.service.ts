import * as models from "@/types/app/my-accounts/page";

import { myAccountsConnector, Connector as MyAccountsConnector } from "@/api/my-accounts/connector";
import { operationsConnector, Connector as OperationsConnector } from "@/api/operations/connector";

export interface MyAccountsService {
    getAccounts(): Promise<models.AccountData[]>;

    getAccount(accountId: string): Promise<models.AccountDetails>;

    getOperationsByCategory(accountId: string): Promise<models.OperationsByCategoryData>;
}

export class MyAccountsServiceImpl implements MyAccountsService {
    constructor(private connector: MyAccountsConnector, private operationsConnector: OperationsConnector) {}
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

    async getAccount(accountId: string): Promise<models.AccountDetails> {
        const account = await this.connector.getAccountDetails(accountId);
        if (!account) {
            throw new Error(`Account with id ${accountId} not found`);
        }

        return {
            id: account.id,
            name: account.name,
            type: account.type,
            balance: account.balance,
            currency: account.currency
        };
    }

    async getOperationsByCategory(accountId: string): Promise<models.OperationsByCategoryData> {
        const period = "2023-08";
        return this.operationsConnector.getOperationsByCategory(accountId, period)
            .then((operationsInGroup) => {
                return {
                    period: period,
                    operationsByCategory: operationsInGroup.map(group => ({
                        categoryName: group.groupName,
                        operationsCount: group.operationsCount,
                        operationsTotalAmount: group.operationsTotalAmount,
                        currency: group.currency
                    }))
                };
            });
    }
}

export function createMyAccountsService(): MyAccountsService {
    return new MyAccountsServiceImpl(myAccountsConnector, operationsConnector);
}

export const myAccountsService: MyAccountsService = createMyAccountsService();