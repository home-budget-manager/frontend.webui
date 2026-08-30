import { useTranslations } from "next-intl";

import styles from "./account-details.module.css";
import PanelComponent from "@controls/panel";

import { numbersService } from "@/services/numbers";
import * as models from "@/types/app/my-accounts/page";

export interface AccountDetailsComponentProps {
    accountData: models.AccountDetails;
}

export default function AccountDetailsComponent({ accountData }: AccountDetailsComponentProps) {
    const t = useTranslations("Components/Pages/MyAccounts/AccountDetails");
    return (<PanelComponent className={styles["account"]}>
        <div className={styles["account-details"]}>
            <div className={styles["field-name"]}>{t('accountName')}:</div>
            <div className={styles["field-value"]}>{accountData.name}</div>
            <div className={styles["field-name"]}>{t('accountType')}:</div>
            <div className={styles["field-value"]}>{accountData.type}</div>
            <div className={styles["field-name"]}>{t('accountBalance')}:</div>
            <div className={styles["field-value"]}>{numbersService.formatCurrency(accountData.balance, accountData.currency)}</div>
        </div>
    </PanelComponent>
    );
}