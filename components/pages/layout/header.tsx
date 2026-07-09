import { Menu, Wallet } from "lucide-react";
import styles from './header.module.css';

export interface HeaderComponentProps {
    setSidebarOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
    today: string;
}

export default function HeaderComponent({ setSidebarOpen, today }: HeaderComponentProps) {
    return (<header className={styles["top-bar"]}>
        <div className={styles["logo-area"]}>
            <button
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Toggle menu"
                className={styles["burger"]}>
                <Menu className={styles["icon"]} />
            </button>
            <div className="flex min-w-0 items-center gap-2">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/15 text-primary-foreground">
                    <Wallet className={styles["icon"]} />
                </div>
                <span className="truncate text-lg font-semibold tracking-tight text-primary-foreground">
                    Fintra
                </span>
            </div>
        </div>

        <div className="flex items-center gap-3 text-right">
            <div className="hidden sm:block">
                <div className="text-sm font-medium text-primary-foreground">Alex Morgan</div>
                <div className="text-xs text-primary-foreground/70">{today}</div>
            </div>
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 text-sm font-semibold text-primary-foreground">
                AM
            </div>
        </div>
    </header>);
}