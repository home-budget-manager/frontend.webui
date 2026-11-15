import styles from "./dashboard-page.module.scss";

import AccountsChart from "./components/accounts-chart";
import HighlightedAccounts from "./components/highlighted-accounts";

export default function DashboardPage() {
  return (
    <div className={styles.content}>
      <div>
        <AccountsChart />
        <AccountsChart />
        <AccountsChart />
      </div>
      <HighlightedAccounts />
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  );
}