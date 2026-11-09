"use client";

import { useState } from "react";

import {
    Menu,
    LayoutDashboard,
    SquareChartGantt,
    NotebookTabs,
    ArrowLeftRight,
    ChartBellCurve,
    Settings,
} from "lucide-react";

import NavigationItem from "./navigation-item";
import { ThemeController } from "../../../app/theme-switcher";

import styles from "./navigation.module.scss";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleSidebarOpened = () => setIsMenuOpen(!isMenuOpen);
    return (
        <nav className={styles.navigation}>
            <ul>
                <li><NavigationItem link="#" onClick={() => toggleSidebarOpened()} icon={Menu} isExpanded={false} hasBackground={false} /></li>
                <li><NavigationItem link="/" title="Dashboard" icon={LayoutDashboard} isExpanded={isMenuOpen} /></li>
                <li><NavigationItem link="/" title="Budgets" icon={SquareChartGantt} isExpanded={isMenuOpen} /></li>
                <li><NavigationItem link="/" title="Accounts" icon={NotebookTabs} isExpanded={isMenuOpen} /></li>
                <li><NavigationItem link="/" title="Transactions" icon={ArrowLeftRight} isExpanded={isMenuOpen} /></li>
                <li><NavigationItem link="/" title="Reports" icon={ChartBellCurve} isExpanded={isMenuOpen} /></li>
                <li><NavigationItem link="/" title="Settings" icon={Settings} isExpanded={isMenuOpen} /></li>
                <li><ThemeController /></li>
            </ul>
        </nav>
    );
}