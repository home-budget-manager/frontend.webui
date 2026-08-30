export type OperationGroupingType = "category" | "budget";
export type OperationType = "income" | "expense" | "transfer";

export interface OperationsInGroup {
    groupType: string;
    groupId: string;
    groupName: string;
    operationsCount: number;
    operationsTotalAmount: number;
    currency: string;
    period: string;
}

export interface GetOperationsInGroupParameters {
    period: string;
    operationType?: OperationType;
}

export interface SearchOperationsParameters {
    accountId?: string;
    from?: Date;
    to?: Date;
    operationType?: OperationType;
    page?: number;
    pageSize?: number;
}

export interface SearchOperationsItem {
    id: string;
    date: Date;
    operationType: OperationType;
    sourceAccountId: string;
    targetAccountId: string;
    title: string;
    amount: number;
    currency: string;
    categoryId: string;
    budgetId: string;
}

export interface SearchOperationsResult {
    items: SearchOperationsItem[];
    totalCount: number;
}
