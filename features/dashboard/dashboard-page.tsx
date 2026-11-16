import HighlightedAccounts from "./components/highlighted-accounts";
import AccountsChart from "./components/accounts-chart";

import styles from "./dashboard-page.module.scss";

export default function DashboardPage() {
  return (
    <div className={styles.content}>
      <div>
        <AccountsChart accountIds={["1", "2", "3", "4"]} />
        <AccountsChart accountIds={["1", "2", "3", "4"]} />
        <AccountsChart accountIds={["1", "2", "3", "4"]} />
      </div>
      <HighlightedAccounts />
    </div>
  );
}