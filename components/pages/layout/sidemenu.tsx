import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './sidemenu.module.css';

import { sideMenuService } from '@/services/components/pages/layout/sidemenu';

export interface SideMenuProps {
    sidebarOpen: boolean;
}

export default function SideMenuComponent({ sidebarOpen }: SideMenuProps) {
    const pathname = usePathname();

    const items = sideMenuService.getMenuItems();

    return (<aside
        className={styles["sidebar"] + " " + (sidebarOpen ? styles["open"] : styles["closed"])}>
        <nav className={styles["navigation"]} aria-label="Main menu">
            <div className={styles["navigation-header"]}>
                Menu
            </div>
            {items.map((item) => (
                <Link
                    key={item.label}
                    href={item.url ?? "/"}
                    className={styles["menu-item"] + " " + (item.isActive(pathname) ? styles["active"] : "")}>
                    {item.icon}
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    </aside>);
}