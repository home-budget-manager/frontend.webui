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

export interface ExpensesByCategoryItem {
    categoryId: string;
    categoryName: string;
    expensesCount: number;
    expensesTotalAmount: number;
    currency: string;
}

export interface ExpensesByCategoryData {
    period: string;
    expensesByCategory: ExpensesByCategoryItem[];
}

export interface ExpensesByBudgetItem {
    budgetId: string;
    budgetName: string;
    expensesCount: number;
    expensesTotalAmount: number;
    currency: string;
}

export interface ExpensesByBudgetData {
    period: string;
    expensesByBudget: ExpensesByBudgetItem[];
}
