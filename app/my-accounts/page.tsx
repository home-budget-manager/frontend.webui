"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { numbersService } from "@/services/numbers";
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

  return (
    <PageContainerComponent title={t('title')} subtitle={t('subtitle')} contentContainerClass={styles.pageContent}>
      <ActionButton onClick={() => alert(t('createAccountButton'))} className={styles.createAccountButton}>
        <Plus />{t('createAccountButton')}
      </ActionButton>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>{t('columns.accountName')}</th>
            <th>{t('columns.accountType')}</th>
            <th>{t('columns.balance')}</th>
            <th>{t('columns.balanceChange')}</th>
            <th>{t('columns.active')}</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a) => (
            <tr key={a.id}>
              <td><Link href={`/my-accounts/${a.id}`}>{a.name}</Link></td>
              <td>{a.type}</td>
              <td>{numbersService.formatCurrency(a.balance, a.currency)}</td>
              <td>{numbersService.formatCurrency(a.periodChange, a.currency)}</td>
              <td>{a.isActive ? <Check /> : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageContainerComponent>
  );
}
