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

export interface SideMenuProps {
    sidebarOpen: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Wallet, label: "Accounts" },
  { icon: ArrowLeftRight, label: "Operations" },
  { icon: Calendar, label: "Planned" },
  { icon: PieChart, label: "Reports" },
  { icon: Target, label: "Goals" },
  { icon: Settings, label: "Settings" },
];

export default function SideMenuComponent({ sidebarOpen }: SideMenuProps) {
    return (<aside
        className={styles["sidebar"] + " " + (sidebarOpen ? styles["open"] : styles["closed"])}>
        <nav className={styles["navigation"]} aria-label="Main menu" aria-expanded={sidebarOpen}>
            <div className={styles["navigation-header"]}>
                Menu
            </div>
            {menuItems.map((item) => (
                <a
                    key={item.label}
                    href="#"
                    className={styles["menu-item"] + " " + (item.active
                        ? styles["active"] : "")}>
                    <item.icon />
                    <span>{item.label}</span>
                </a>
            ))}
        </nav>
    </aside>);
}