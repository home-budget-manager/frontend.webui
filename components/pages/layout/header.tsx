import { Menu, Wallet } from "lucide-react";
import styles from './header.module.css';

export interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

export default function HeaderComponent({ sidebarOpen, setSidebarOpen }: HeaderProps) {
    return (<header className={styles["top-bar"]}>
        <div className={styles["image-container"]}>
            <button onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={sidebarOpen} className={styles["burger"]}>
                <Menu className={styles["icon"]} />
            </button>
            <div className={styles["image-container"]}>
                <div className={styles["wallet"]}>
                    <Wallet className={styles["icon"]} />
                </div>
                <span className={styles["app-title"]}>
                    Home Budget Manager
                </span>
            </div>
        </div>

        <div className={styles["user-info"]}>
            <div className={styles["user-text"]}>
                <div className={styles["user-name"]}>Alex Morgan</div>
                <div className={styles["user-detail"]}>Checking accounts: $3,421.12</div>
                <div className={styles["user-detail"]}>Savings accounts: $23,421.12</div>
            </div>
            <div className={styles["user-avatar"]}>
                AM
            </div>
        </div>
    </header>);
}