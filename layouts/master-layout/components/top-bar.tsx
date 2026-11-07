import { useTranslations } from "next-intl";

import TopBarSummaryItem from "./top-bar-summary-item";
import UserInfo from "./user-info";

import styles from "./top-bar.module.scss";

export default function TopBar() {
    const t = useTranslations("layouts/master-layout/components/top-bar");
    return (
        <div className={styles.topbar}>
            <TopBarSummaryItem label={t('currentPeriod')} value="January 2026" />
            <TopBarSummaryItem label={t('periodIncomes')} value="1,234.56 zł" />
            <TopBarSummaryItem label={t('periodOutcomes')} value="1,234.56 zł" />
            <TopBarSummaryItem label={t('periodTransfers')} value="1,234.56 zł" />
            <TopBarSummaryItem label={t('totalValue')} value="1,234.56 zł" />
            <UserInfo />
        </div>
    );
}