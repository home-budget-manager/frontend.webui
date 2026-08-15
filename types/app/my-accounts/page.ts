export interface AccountData {
    id: string;
    name: string;
    type: string;
    balance: number;
    periodChange: number;
    currency: string;
    isActive: boolean;
}

export interface AccountDetails {
    id: string;
    name: string;
    type: string;
    balance: number;
    currency: string;
}

export interface OperationsByCategoryItem {
    categoryName: string;
    operationsCount: number;
    operationsTotalAmount: number;
    currency: string;
}

export interface OperationsByCategoryData {
    period: string;
    operationsByCategory: OperationsByCategoryItem[];
}
