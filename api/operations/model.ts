export type OperationGroupingType = "category" | "budget";

export interface OperationsInGroup {
    groupType: string;
    groupId: string;
    groupName: string;
    operationsCount: number;
    operationsTotalAmount: number;
    currency: string;
    period: string;
}