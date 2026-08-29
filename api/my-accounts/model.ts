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

export type SummaryItemType = "incomes" | "expenses" | "transfersIncoming" | "transfersOutgoing";

export interface SummaryItem {
    itemType: SummaryItemType;
    count: number;
    amount: number;
    currency: string;
}

export interface OperationsSummary {
    items: SummaryItem[];
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