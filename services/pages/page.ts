export type OperationType = 'income' | 'expense' | 'transfer';

export interface Operation {
    id: string;
    type: OperationType;
    label: string;
    category: string;
    date: string; // ISO 8601 format
    amount: number; // Positive for income, negative for expenses
}

export interface FetchSummariesResponse {
  summaries: {
    label: string;
    value: number;
    change: string;
    positive?: boolean;
  }[];
}

export interface FetchLastOperationsRequest {
    itemsCount: number;
}

export interface FetchLastOperationsResponse {
    operations: Operation[];
}

export interface FetchUpcomingOperationsRequest {
    itemsCount: number;
}

export interface FetchUpcomingOperationsResponse {
    operations: Operation[];
}

export interface PageService {
    fetchSummaries(): Promise<FetchSummariesResponse>;
    fetchLastOperations(request: FetchLastOperationsRequest): Promise<FetchLastOperationsResponse>;
    fetchUpcomingOperations(request: FetchUpcomingOperationsRequest): Promise<FetchUpcomingOperationsResponse>;
}

export class PageServiceImpl implements PageService {
    async fetchSummaries(): Promise<FetchSummariesResponse> {
        // Simulate fetching data from an API or database
        const summaries = [
            { label: "Total Balance", value: 45947.44, change: "+3.2% this month", positive: true },
            { label: "Income (July)", value: 5050, change: "+12% vs June", positive: true },
            { label: "Expenses (July)", value: 1640.91, change: "-4.5% vs June" },
        ];
        return { summaries };
    }

    async fetchLastOperations(request: FetchLastOperationsRequest): Promise<FetchLastOperationsResponse> {
        // Simulate fetching data from an API or database
        const operations: Operation[] = [
            { id: "1", type: "expense", label: "Whole Foods Market", category: "Groceries", date: "2023-07-07", amount: -84.32 },
            { id: "2", type: "income", label: "Monthly Salary", category: "Income", date: "2023-07-05", amount: 4200.0 },
            { id: "3", type: "transfer", label: "Savings", category: "Savings", date: "2023-07-05", amount: -28.5 },
            { id: "4", type: "expense", label: "Shell Gas Station", category: "Transport", date: "2023-07-04", amount: -62.1 },
            { id: "5", type: "expense", label: "Netflix Subscription", category: "Entertainment", date: "2023-07-03", amount: -15.99 },
            { id: "6", type: "expense", label: "Rent Payment", category: "Housing", date: "2023-07-01", amount: -1450.0 },
        ];
        return { operations: operations.slice(0, request.itemsCount) };
    }

    async fetchUpcomingOperations(request: FetchUpcomingOperationsRequest): Promise<FetchUpcomingOperationsResponse> {
        // Simulate fetching data from an API or database
        const operations: Operation[] = [
            { id: "7", type: "expense", label: "Electricity Bill", category: "Utilities", date: "2023-07-12", amount: -128.4 },
            { id: "8", type: "expense", label: "Credit Card Payment", category: "Debt", date: "2023-07-15", amount: -420.0 },
            { id: "9", type: "transfer", label: "Savings Transfer", category: "Savings", date: "2023-07-20", amount: -500.0 },
            { id: "10", type: "expense", label: "Internet Provider", category: "Utilities", date: "2023-07-22", amount: -59.99 },
            { id: "11", type: "income", label: "Freelance Project", category: "Income", date: "2023-07-25", amount: 600.0 },
        ];
        return { operations: operations.slice(0, request.itemsCount) };
    }
}

export const pageService: PageService = new PageServiceImpl();
