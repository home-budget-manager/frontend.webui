"use client";

import { useTranslations } from "next-intl";
import { useReducer } from "react";

import PageContainerComponent from "@/components/pages/page-container";
import PanelComponent from "@controls/panel";

import { numbersService } from "@/services/numbers";
import styles from './page.module.css';
import * as types from '@/types/app/my-accounts/create/page';

export default function CreateAccount() {
  const [accountData, accountDataDispatch] = useReducer(types.AccountDataReducer, types.createInitialAccountData());
  const t = useTranslations("App/MyAccounts/Create/Page");
  return (
    <PageContainerComponent
      title={t('title')}
      backlink="/my-accounts"
      contentContainerClass={styles["account-data"]}>
      <PanelComponent className={styles["account"]}>
        <div className={styles["account-details"]}>
          <div className={styles["field-name"]}>{t('accountName')}:</div>
          <div className={styles["field-value"]}><input type="text" value={accountData.name} readOnly /></div>
          <div className={styles["field-name"]}>{t('accountType')}:</div>
          <div className={styles["field-value"]}><input type="text" value={accountData.type.name} readOnly /></div>
          <div className={styles["field-name"]}>{t('accountBalance')}:</div>
          <div className={styles["field-value"]}><input type="text" value={numbersService.formatCurrency(accountData.initialBalance, accountData.currency)} readOnly /></div>
        </div>
      </PanelComponent>
    </PageContainerComponent>
  );
}