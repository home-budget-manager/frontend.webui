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
