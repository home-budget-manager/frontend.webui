"use client";

import { useState, ComponentType } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

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

export default function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleSidebarOpened = () => setIsMenuOpen(!isMenuOpen);
    const t = useTranslations("layouts/master-layout/components/navigation"); 

    const rawMenuItems: MenuItem[] = [
        {
            link: "/",
            title: t("dashboard"),
            icon: LayoutDashboard,
        },
        {
            link: "/budgets",
            title: t("budgets"),
            icon: SquareChartGantt,
        },
        {
            link: "/under-construction/1",
            title: t("accounts"),
            icon: NotebookTabs,
        },
        {
            link: "/under-construction/2",
            title: t("transactions"),
            icon: ArrowLeftRight,
        },
        {
            link: "/under-construction/3",
            title: t("reports"),
            icon: ChartBellCurve,
        },
        {
            link: "/under-construction/4",
            title: t("settings"),
            icon: Settings,
        },
    ];

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