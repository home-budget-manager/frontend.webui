"use client";

import { useState, ComponentType } from "react";
import { usePathname } from "next/navigation";

import {
    Menu,
    LayoutDashboard,
    SquareChartGantt,
    NotebookTabs,
    ArrowLeftRight,
    ChartBellCurve,
    Settings,
} from "lucide-react";

import NavigationItem, { NavigationItemProps } from "./navigation-item";
import { ThemeController } from "../../../app/theme-switcher";

import styles from "./navigation.module.scss";

interface MenuItem {
    icon: ComponentType;
    title?: string;
    link: string;
}

const rawMenuItems: MenuItem[] = [
    {
        link: "/",
        title: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        link: "/budgets",
        title: "Budgets",
        icon: SquareChartGantt,
    },
    {
        link: "/under-construction/1",
        title: "Accounts",
        icon: NotebookTabs,
    },
    {
        link: "/under-construction/2",
        title: "Transactions",
        icon: ArrowLeftRight,
    },
    {
        link: "/under-construction/3",
        title: "Reports",
        icon: ChartBellCurve,
    },
    {
        link: "/under-construction/4",
        title: "Settings",
        icon: Settings,
    },
];

export default function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleSidebarOpened = () => setIsMenuOpen(!isMenuOpen);

    const menuItems = rawMenuItems.map(item => ({
        ...item,
        isActive: item.link === pathname,
    }));

    return (
        <nav className={styles.navigation}>
            <ul>
                <li><NavigationItem link="" onClick={() => toggleSidebarOpened()} icon={Menu} isExpanded={false} hasBackground={false} /></li>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <NavigationItem {...item} isExpanded={isMenuOpen} />
                    </li>
                ))}
                <li><ThemeController className={styles.themeSelector} /></li>
            </ul>
        </nav>
    );
}