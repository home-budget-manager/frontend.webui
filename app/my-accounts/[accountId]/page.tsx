"use client";

import { use, useEffect, useState } from "react";

import { myAccountsService } from "@/services/app/my-accounts.service";
import * as models from "@/types/app/my-accounts/page";

import PageContainerComponent from "@/components/pages/page-container";
import AccountDetailsComponent from "@/components/pages/my-accounts/account-details";

import styles from './page.module.css';

export interface MyAccountPageParameters {
  accountId: string;
}

export default function MyAccountPage({ params }: { params: Promise<MyAccountPageParameters> }) {
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
    return <div>Loading account data...</div>;
  }

  return (
    <PageContainerComponent
      title="Account details"
      subtitle={`Details of '${accountData.name}'`}
      backlink="/my-accounts"
      backlinkLabel="Back to My Accounts list"
      contentContainerClass={styles["account-data"]}>
      <AccountDetailsComponent accountData={accountData} />
    </PageContainerComponent>
  );
}