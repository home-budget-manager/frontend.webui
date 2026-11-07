import Link from 'next/link';

import { WalletCards } from "lucide-react";
import styles from "./logo.module.scss";

export default function Logo() {
    return (
        <Link
            href="/"
            className={styles.homeLink}>
            <WalletCards />
            <span>Home Budget Manager</span>
        </Link>
    );
}