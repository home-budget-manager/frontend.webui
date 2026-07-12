import LastOperations from "./last-operations";
import UpcomingOperations from "./upcoming-operations";
import AccountsList from "./accounts-list";

import styles from "./widgets.module.css";

export default function Widgets() {
    return (<div className={styles.widgets}>
        <LastOperations />

        <UpcomingOperations />

        <AccountsList />
    </div>);
}
