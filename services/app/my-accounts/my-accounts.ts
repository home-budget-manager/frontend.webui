import * as models from "@/types/app/my-accounts/page";

export interface MyAccountsService {
    getAccounts(): Promise<models.AccountData[]>;
}

export class MyAccountsServiceImpl implements MyAccountsService {
    async getAccounts(): Promise<models.AccountData[]> {
        // Simulate fetching data from an API or database
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: "1", name: "Checking Account", type: "checking", balance: 3421.12, periodChange: -242.22, currency: "USD", isActive: true },
                    { id: "2", name: "Savings Account", type: "savings", balance: 23421.12, periodChange: 1544.12, currency: "USD", isActive: false },
                    { id: "3", name: "Investment Account", type: "investment", balance: 15000.00, periodChange: 500.00, currency: "PLN", isActive: true },
                ]);
            }, 1234);
        });
    }
}

export function createMyAccountsService(): MyAccountsService {
    return new MyAccountsServiceImpl();
}

export const myAccountsService: MyAccountsService = createMyAccountsService();