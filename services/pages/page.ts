export interface FetchSummariesResponse {
  summaries: {
    label: string;
    value: number;
    change: string;
    positive?: boolean;
  }[];
}

export interface PageService {
    fetchSummaries(): Promise<FetchSummariesResponse>;
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
}

export const pageService: PageService = new PageServiceImpl();
