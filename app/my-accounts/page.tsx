"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { numbersService } from "@/services/numbers";
import Table from "@controls/table";
import PageContainerComponent from "@/components/pages/page-container";
import { ActionButton } from "@/components/controls/buttons";

import { Check, Plus } from 'lucide-react';

import * as model from '@/types/app/my-accounts/page';
import { myAccountsService } from "@/services/app/my-accounts.service";

import styles from "./page.module.css";

export default function MyAccountsPage() {
  const t = useTranslations("App/MyAccounts/Page");
  const [accounts, setAccounts] = useState<model.AccountData[]>([]);

  useEffect(() => {
    myAccountsService.getAccounts().then((data) => {
      setAccounts(data);
    });
  }, []);

  const columns = ["Account Name", "Type", "Balance", "Change in period", "Active?"];

  return (
    <PageContainerComponent title={t('title')} subtitle={t('subtitle')} contentContainerClass={styles.pageContent}>
        <ActionButton onClick={() => alert(t('createAccountButton'))} className={styles.createAccountButton}>
          <Plus />{t('createAccountButton')}
        </ActionButton>
        <Table
          customClass={styles.tableContainer}
          columns={columns}
          rows={accounts.map((a) => [
            <span key="name"><Link href={`/my-accounts/${a.id}`}>{a.name}</Link></span>,
            <span key="type">{a.type}</span>,
            <span key="balance">{numbersService.formatCurrency(a.balance, a.currency)}</span>,
            <span key="periodChange">{numbersService.formatCurrency(a.periodChange, a.currency)}</span>,
            <span key="isActive">{a.isActive ? <Check /> : null}</span>,
          ])}
        />
    </PageContainerComponent>
  );
}
