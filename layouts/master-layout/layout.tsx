"use client";

import { useState } from "react";
import { ThemeController } from "@/app/theme-switcher";
import Logo from "./components/logo";

import TopBar from "./components/top-bar";
import Navigation from "./components/navigation";

import styles from "./layout.module.scss";

export default function MasterLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className={styles["main-layout"]}>
            <div className={styles.logoContainer}>
                <Logo />
            </div>
            <div className={styles.topbar}>
                <TopBar />
            </div>
            <div className={styles.sidebar}>
                <Navigation />
            </div>
            <div className={styles["main-content"]}>
                {children}
            </div>
            <div className={styles.footer}>
                Home Budget Manager © 2026
            </div>
        </div>
    );
}