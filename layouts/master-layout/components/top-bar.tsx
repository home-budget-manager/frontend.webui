import { useTranslations, useFormatter } from "next-intl";

import TopBarSummaryItem from "./top-bar-summary-item";
import UserInfo from "./user-info";
import Logo from "./logo";

import styles from "./top-bar.module.scss";

export default function TopBar() {
    const t = useTranslations("layouts/master-layout/components/top-bar");
    const formatter = useFormatter();
    const currentDate = new Date(2027, 0, 1);
    const incomes = 1234.56;
    const outcomes = 1234.56;
    const transfers = 1234.56;
    const totalValue = 1234.56;
    const currency = "PLN";
    return (
        <div className={styles.topbar}>
            <Logo />
            <TopBarSummaryItem label={t('currentPeriod')} value={formatter.dateTime(currentDate, { month: "long", year: "numeric" })} />
            <TopBarSummaryItem label={t('periodIncomes')} value={formatter.number(incomes, { style: "currency", currency: currency })} />
            <TopBarSummaryItem label={t('periodOutcomes')} value={formatter.number(outcomes, { style: "currency", currency: currency })} />
            <TopBarSummaryItem label={t('periodTransfers')} value={formatter.number(transfers, { style: "currency", currency: currency })} />
            <TopBarSummaryItem label={t('totalValue')} value={formatter.number(totalValue, { style: "currency", currency: currency })} />
            <UserInfo />
        </div>
    );
}