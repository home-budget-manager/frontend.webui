"use client";

import { useState, useEffect } from "react";

import LastAccountOperations from "./last-account-operations";

const accountIds = [1, 2, 3, 4, 5];

export default function HighlightedAccounts() {
    const [accounts, setAccounts] = useState<string[]>([]);

    useEffect(() => {
        setAccounts(accountIds.map(String));
    }, []);

    return (
        <div>
            {accounts.map(accountId => (
                <LastAccountOperations key={accountId} accountId={accountId} />
            ))}
        </div>
    );
}