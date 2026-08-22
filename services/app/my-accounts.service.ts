import * as models from "@/types/app/my-accounts/page";

import { myAccountsConnector, Connector as MyAccountsConnector } from "@/api/my-accounts/connector";
import { operationsConnector, Connector as OperationsConnector } from "@/api/operations/connector";

export interface MyAccountsService {
    getAccounts(): Promise<models.AccountData[]>;
    getAccount(accountId: string): Promise<models.AccountDetails>;
    getExpensesByCategory(accountId: string): Promise<models.ExpensesByCategoryData>;
    getExpensesByBudget(accountId: string): Promise<models.ExpensesByBudgetData>;
    getAccountOperationsSummary(accountId: string): Promise<models.OperationsSummary>;
    getAccountBalanceHistory(accountId: string): Promise<models.AccountBalanceHistory>;
}

export class MyAccountsServiceImpl implements MyAccountsService {
    constructor(private connector: MyAccountsConnector, private operationsConnector: OperationsConnector) { }
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

    async getExpensesByCategory(accountId: string): Promise<models.ExpensesByCategoryData> {
        const period = "2023-08";
        return this.operationsConnector.getOperationsByGroup(accountId, "category", { period: period, operationType: "expense" })
            .then((operationsInGroup) => {
                return {
                    period: period,
                    expensesByCategory: operationsInGroup.map(group => ({
                        categoryId: group.groupId,
                        categoryName: group.groupName,
                        expensesCount: group.operationsCount,
                        expensesTotalAmount: group.operationsTotalAmount,
                        currency: group.currency
                    }))
                };
            });
    }

    async getExpensesByBudget(accountId: string): Promise<models.ExpensesByBudgetData> {
        const period = "2023-08";
        return this.operationsConnector.getOperationsByGroup(accountId, "budget", { period: period, operationType: "expense" })
            .then((operationsInGroup) => {
                return {
                    period: period,
                    expensesByBudget: operationsInGroup.map(group => ({
                        budgetId: group.groupId,
                        budgetName: group.groupName,
                        expensesCount: group.operationsCount,
                        expensesTotalAmount: group.operationsTotalAmount,
                        currency: group.currency
                    }))
                };
            });
    }

    async getAccountOperationsSummary(accountId: string): Promise<models.OperationsSummary> {
        return this.connector.getAccountOperationsSummary(accountId)
            .then((summary) => {
                return {
                    incomes: summary.incomes,
                    expenses: summary.expenses,
                    transfersIncoming: summary.transfersIncoming,
                    transfersOutgoing: summary.transfersOutgoing
                };
            });
    }

    async getAccountBalanceHistory(accountId: string): Promise<models.AccountBalanceHistory> {
        const from = new Date();
        from.setMonth(from.getMonth() - 1);
        const to = new Date();
        return this.connector.getAccountBalanceHistory(accountId, from, to);
    }
}

export function createMyAccountsService(): MyAccountsService {
    return new MyAccountsServiceImpl(myAccountsConnector, operationsConnector);
}

export const myAccountsService: MyAccountsService = createMyAccountsService();