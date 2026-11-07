import Link from "next/link";

import styles from "./navigation.module.scss";

export default function Navigation() {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/incomes">Incomes</Link></li>
                <li><Link href="/outcomes">Outcomes</Link></li>
                <li><Link href="/transfers">Transfers</Link></li>
            </ul>
        </nav>
    );
}