export type AccountType = "checking" | "savings" | "cashWallet" | "creditCard";

export interface AccountData {
    id: string;
    name: string;
    type: AccountType;
    balance: number;
    currentPeriodChange: number;
    currency: string;
    isActive: boolean;
}

export interface OperationTypeSummary {
    amount: number;
    count: number;
}

export interface OperationsSummary {
    incomes: OperationTypeSummary;
    expenses: OperationTypeSummary;
    transfersIncoming: OperationTypeSummary;
    transfersOutgoing: OperationTypeSummary;
}

export interface BalanceHistoryEntry {
    date: string;
    balance: number;
}

export interface AccountBalanceHistory {
    accountId: string;
    currency: string;
    balanceHistory: BalanceHistoryEntry[];
}