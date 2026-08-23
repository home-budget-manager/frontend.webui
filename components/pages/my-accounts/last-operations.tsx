import { useEffect, useState } from 'react';

import { numbersService } from "@services/numbers";
import { myAccountsService } from "@/services/app/my-accounts.service";
import * as models from "@/types/app/my-accounts/page";

import TableComponent from "@controls/table";
import Panel from '@/components/controls/panel';

export interface LastOperationsProps {
    accountId: string;
}

export default function LastOperations({ accountId }: LastOperationsProps) {
    const [lastOperations, setLastOperations] = useState<models.OperationsListItem[] | null>(null);
    useEffect(() => {
        const fetchLastOperations = async () => {
            try {
                const operations = await myAccountsService.getLastOperations(accountId);
                setLastOperations(operations);
            }
            catch (error) {
                console.error("Error fetching last operations:", error);
            }
        };
        fetchLastOperations();
    }, [accountId]);

    if (!lastOperations) {
        return <div>Loading last operations...</div>;
    }
    return (<Panel title="Last Operations">
        <TableComponent
            columns={["Date", "Title", "Amount"]}
            rows={lastOperations.map(o => [
                <span key="date">{o.date.toLocaleDateString()}</span>,
                <span key="title">{o.title}</span>,
                <span key="amount">{numbersService.formatCurrency(o.amount)}</span>
            ])}
        />
    </Panel>
    );
}