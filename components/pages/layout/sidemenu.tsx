import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";

import Link from 'next/link';
import styles from './sidemenu.module.css';

import { sideMenuService } from '@/services/components/pages/layout/sidemenu';

export interface SideMenuProps {
    sidebarOpen: boolean;
}

export default function SideMenuComponent({ sidebarOpen }: SideMenuProps) {
    const pathname = usePathname();
    const t = useTranslations("Components/Pages/Layout/SideMenu");

    const items = sideMenuService.getMenuItems();

    return (<aside
        className={styles["sidebar"] + " " + (sidebarOpen ? styles["open"] : styles["closed"])}>
        <nav className={styles["navigation"]} aria-label={t('mainMenu')}>
            <div className={styles["navigation-header"]}>
                {t('menu')}
            </div>
            {items.map((item) => {
                const Icon = item.icon;
                return (
                <Link
                    key={item.label}
                    href={item.url ?? "/"}
                    className={styles["menu-item"] + " " + (item.isActive(pathname) ? styles["active"] : "")}>
                    <Icon />
                    <span>{item.label}</span>
                </Link>
                );
            })}
        </nav>
    </aside>);
}