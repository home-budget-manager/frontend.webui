import * as models from "@/types/app/my-accounts/page";
import * as apiModels from "@/api/my-accounts/model";

import { myAccountsConnector, Connector as MyAccountsConnector } from "@/api/my-accounts/connector";
import { operationsConnector, Connector as OperationsConnector } from "@/api/operations/connector";

export interface MyAccountsService {
    getAccounts(): Promise<models.AccountData[]>;
    getAccount(accountId: string): Promise<models.AccountDetails>;
    getExpensesByCategory(accountId: string): Promise<models.ExpensesByCategoryData>;
    getExpensesByBudget(accountId: string): Promise<models.ExpensesByBudgetData>;
    getAccountOperationsSummary(accountId: string): Promise<models.OperationsSummary>;
    getAccountBalanceHistory(accountId: string): Promise<models.AccountBalanceHistory>;
    getLastOperations(accountId: string, page?: number, pageSize?: number): Promise<models.OperationsListItem[]>;
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
                const items = summary.items.map(item => ({
                    itemType: item.itemType,
                    count: item.count,
                    amount: item.amount,
                    currency: item.currency
                }));
                return { items };
            });
    }

    async getAccountBalanceHistory(accountId: string): Promise<models.AccountBalanceHistory> {
        const from = new Date();
        from.setMonth(from.getMonth() - 1);
        const to = new Date();
        return this.connector.getAccountBalanceHistory(accountId, from, to);
    }

    async getLastOperations(accountId: string, page: number = 1, pageSize: number = 10): Promise<models.OperationsListItem[]> {
        const params = {
            accountId: accountId,
            page: page,
            pageSize: pageSize
        };
        const result = await this.operationsConnector.searchOperations(params);
        return result.items
            .map(item => ({
                id: item.id,
                date: item.date,
                operationType: `Operation type: '${item.operationType}'`,
                sourceAccount: `Account name: ${item.sourceAccountId}`,
                targetAccount: `Account name: ${item.targetAccountId}`,
                title: item.title,
                amount: item.amount,
                currency: item.currency,
                category: `Category ID: ${item.categoryId}`,
                budget: `Budget ID: ${item.budgetId}`
            }));
    }

    private mapSummaryItemTypeToTitle(itemType: apiModels.SummaryItemType): string {
        switch (itemType) {
            case "incomes":
                return "Incomes";
            case "expenses":
                return "Expenses";
            case "transfersIncoming":
                return "Transfers Incoming";
            case "transfersOutgoing":
                return "Transfers Outgoing";
            default:
                return "Unknown";
        }
    }
}

export function createMyAccountsService(): MyAccountsService {
    return new MyAccountsServiceImpl(myAccountsConnector, operationsConnector);
}

export const myAccountsService: MyAccountsService = createMyAccountsService();