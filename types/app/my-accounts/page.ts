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