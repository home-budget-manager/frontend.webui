import HighlightedAccounts from "./components/highlighted-accounts";
import AccountsChart from "./components/accounts-chart";

import styles from "./dashboard-page.module.scss";

export default function DashboardPage() {
  return (
    <div className={styles.content}>
      <div>
        <AccountsChart />
        <AccountsChart />
        <AccountsChart />
      </div>
      <HighlightedAccounts />
    </div>
  );
}