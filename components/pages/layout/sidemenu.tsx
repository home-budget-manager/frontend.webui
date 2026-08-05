import { usePathname } from 'next/navigation';
import styles from './sidemenu.module.css';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Calendar,
  PieChart,
  Target,
  Settings,
} from "lucide-react";

import { sideMenuService } from '@/services/components/pages/layout/sidemenu';

export interface SideMenuProps {
    sidebarOpen: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, url: '/', label: "Dashboard" },
  { icon: Wallet, url: '/my-accounts', label: "Accounts" },
  { icon: ArrowLeftRight, label: "Operations" },
  { icon: Calendar, label: "Planned" },
  { icon: PieChart, label: "Reports" },
  { icon: Target, label: "Goals" },
  { icon: Settings, label: "Settings" },
];

export default function SideMenuComponent({ sidebarOpen }: SideMenuProps) {
    const pathname = usePathname();

    const items = sideMenuService.getMenuItems();

    return (<aside
        className={styles["sidebar"] + " " + (sidebarOpen ? styles["open"] : styles["closed"])}>
        <nav className={styles["navigation"]} aria-label="Main menu" aria-expanded={sidebarOpen}>
            <div className={styles["navigation-header"]}>
                Menu
            </div>
            {items.map((item) => (
                <a
                    key={item.label}
                    href={item.url ?? "/"}
                    className={styles["menu-item"] + " " + (item.isActive(pathname) ? styles["active"] : "")}>
                    {item.icon}
                    <span>{item.label}</span>
                </a>
            ))}
        </nav>
    </aside>);
}