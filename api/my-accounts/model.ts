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