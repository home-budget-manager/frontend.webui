"use client";

import { use, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { myAccountsService } from "@/services/app/my-accounts.service";
import * as models from "@/types/app/my-accounts/page";

import PageContainerComponent from "@/components/pages/page-container";
import { Loader } from "@/components/controls";
import {
  AccountDetailsComponent,
  OperationsByCategory,
  OperationsByBudget,
  PeriodSummary,
  AccountBalanceHistory,
  LastOperations
} from "@/components/pages/my-accounts";

import styles from './page.module.css';

export interface MyAccountPageParameters {
  accountId: string;
}

export default function MyAccountPage({ params }: { params: Promise<MyAccountPageParameters> }) {
  const t = useTranslations("App/MyAccounts/[accountId]/Page");
  const { accountId } = use(params)
  const [accountData, setAccountData] = useState<models.AccountDetails | null>(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const data = await myAccountsService.getAccount(accountId);
        setAccountData(data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccountData();
  }, [accountId]);

  if (!accountData) {
    return (
      <PageContainerComponent
        title=""
        contentContainerClass={styles["account-data"]}>
        <Loader />
      </PageContainerComponent>
    );
  }

  return (
    <PageContainerComponent
      title={accountData.name}
      backlink="/my-accounts"
      backlinkLabel={t('backToAccountsList')}
      contentContainerClass={styles["account-data"]}>
      <AccountDetailsComponent accountData={accountData} />
      <OperationsByCategory accountId={accountId} />
      <OperationsByBudget accountId={accountId} />
      <PeriodSummary accountId={accountId} />
      <AccountBalanceHistory accountId={accountId} />
      <LastOperations accountId={accountId} />
    </PageContainerComponent>
  );
}