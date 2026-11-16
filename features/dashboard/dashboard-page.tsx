import HighlightedAccounts from "./components/highlighted-accounts";
import AccountsChart from "./components/accounts-chart";
import BudgetsResults from "./components/budgets-results";

import styles from "./dashboard-page.module.scss";

export default function DashboardPage() {
  return (
    <div className={styles.content}>
      <div>
        <AccountsChart accountIds={["1", "2", "3", "4"]} />
        <BudgetsResults />
      </div>
      <HighlightedAccounts />
    </div>
  );
}