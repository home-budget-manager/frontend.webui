"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { numbersService } from "@/services/numbers";
import Table from "@/components/pages/page/table";
import PageContainerComponent from "@/components/pages/page-container";
import { ActionButton } from "@/components/controls/buttons";

import { Check, Plus } from 'lucide-react';

import * as model from '@/types/app/my-accounts/page';

import styles from "./page.module.css";

const accountsFromService: model.AccountData[] = [
  { id: "1", name: "Checking Account", type: "checking", balance: 3421.12, periodChange: -242.22, currency: "USD", isActive: true },
  { id: "2", name: "Savings Account", type: "savings", balance: 23421.12, periodChange: 1544.12, currency: "USD", isActive: false },
  { id: "3", name: "Investment Account", type: "investment", balance: 15000.00, periodChange: 500.00, currency: "PLN", isActive: true },
];

export default function MyAccountsPage() {
  const [accounts, setAccounts] = useState<model.AccountData[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setAccounts(accountsFromService);
    }, 1234);
  }, []);

  const columns = ["Account Name", "Type", "Balance", "Change in period", "Active?"];

  return (
    <PageContainerComponent title="Your accounts" subtitle="Check status of your accounts." contentContainerClass={styles.pageContent}>
        <ActionButton onClick={() => alert("Create new account")} className={styles.createAccountButton}>
          <Plus />Create new account
        </ActionButton>
        <Table
          customClass={styles.tableContainer}
          columns={columns}
          rows={accounts.map((a) => [
            <span><Link href={`/my-accounts/${a.id}`}>{a.name}</Link></span>,
            <span>{a.type}</span>,
            <span>{numbersService.formatCurrency(a.balance, a.currency)}</span>,
            <span>{numbersService.formatCurrency(a.periodChange, a.currency)}</span>,
            <span>{a.isActive ? <Check /> : null}</span>,
          ])}
        />
    </PageContainerComponent>
  );
}
