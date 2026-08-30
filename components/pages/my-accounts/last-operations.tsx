import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { numbersService } from "@services/numbers";
import { myAccountsService } from "@/services/app/my-accounts.service";
import { Loader } from '@/components/controls';
import * as models from "@/types/app/my-accounts/page";

import Panel from '@/components/controls/panel';

import styles from './last-operations.module.css';

export interface LastOperationsProps {
    accountId: string;
}

export default function LastOperations({ accountId }: LastOperationsProps) {
    const t = useTranslations("Components/Pages/MyAccounts/LastOperations");
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

    return (<Panel title={t("title")} className={styles["last-operations"]}>
        <table>
            <thead>
                <tr>
                    <th>{t("columns.date")}</th>
                    <th>{t("columns.title")}</th>
                    <th>{t("columns.from")}</th>
                    <th>{t("columns.to")}</th>
                    <th>{t("columns.amount")}</th>
                </tr>
            </thead>
            <tbody>
                {!lastOperations ?
                    (<tr><td colSpan={5}><Loader /></td></tr>) :
                    lastOperations.map((operation, index) => (
                        <tr key={operation.id}>
                            <td>{operation.date.toLocaleDateString()} {operation.date.toLocaleTimeString()}</td>
                            <td>{operation.title}</td>
                            <td>{operation.sourceAccount}</td>
                            <td>{operation.targetAccount}</td>
                            <td>{numbersService.formatCurrency(operation.amount)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </Panel>);
}