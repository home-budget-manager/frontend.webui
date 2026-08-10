import * as model from '@/types/components/pages/layout/sidemenu';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Calendar,
  PieChart,
  Target,
  Settings,
} from "lucide-react";

export interface SideMenuService {
    getMenuItems(): model.MenuItem[];
}

export class SideMenuServiceImpl implements SideMenuService {
    getMenuItems(): model.MenuItem[] {
        return [
            new model.MenuItem(<LayoutDashboard />, "Dashboard", "/"),
            new model.MenuItem(<Wallet />, "My Accounts", "/my-accounts", (current, item) => current === item || current.startsWith(item + "/")),
            new model.MenuItem(<ArrowLeftRight />, "Operations", "/operations"),
            new model.MenuItem(<Calendar />, "Planned", "/planned"),
            new model.MenuItem(<PieChart />, "Reports", "/reports"),
            new model.MenuItem(<Target />, "Goals", "/goals"),
            new model.MenuItem(<Settings />, "Settings", "/settings"),
        ];
    }
}

export function createSideMenuService(): SideMenuService {
    return new SideMenuServiceImpl();
}

export const sideMenuService: SideMenuService = createSideMenuService();
