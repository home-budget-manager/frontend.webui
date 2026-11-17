import * as widgets from "./components";

import styles from "./dashboard-page.module.scss";

export default function DashboardPage() {
  return (
    <div className={styles.content}>
      <div>
        <widgets.AccountsChart accountIds={["1", "2", "3", "4"]} />
        <widgets.ExpensesBudgetsResults />
        <widgets.IncomesBudgetsResults />
      </div>
      <widgets.HighlightedAccounts />
    </div>
  );
}