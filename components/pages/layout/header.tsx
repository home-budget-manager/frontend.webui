import { Menu, Wallet } from "lucide-react";
import styles from './header.module.css';

export interface HeaderComponentProps {
    setSidebarOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
    today: string;
}

export default function HeaderComponent({ setSidebarOpen, today }: HeaderComponentProps) {
    return (<header className={styles["top-bar"]}>
        <div className={styles["image-container"]}>
            <button onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle menu" className={styles["burger"]}>
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
                <div className={styles["user-date"]}>{today}</div>
            </div>
            <div className={styles["user-avatar"]}>
                AM
            </div>
        </div>
    </header>);
}