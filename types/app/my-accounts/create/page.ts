export interface AccountType {
    id: string;
    name: string;
}

export interface NewAccountData {
    name: string;
    type: AccountType;
    initialBalance: number;
    currency: string;
}

type AccountDataActionType = "setName" | "setType" | "setBalance" | "setCurrency";

export function createInitialAccountData(): NewAccountData {
    return {
        name: '',
        type: { id: '', name: '' },
        initialBalance: 0,
        currency: ''
    }
};

export function AccountDataReducer(state: NewAccountData, action: { type: AccountDataActionType, payload: any }): NewAccountData {
    switch (action.type) {
        case 'setName':
            return { ...state, name: action.payload };
        case 'setType':
            return { ...state, type: action.payload };
        case 'setBalance':
            return { ...state, initialBalance: action.payload };
        case 'setCurrency':
            return { ...state, currency: action.payload };
        default:
            return state;
    }
}
