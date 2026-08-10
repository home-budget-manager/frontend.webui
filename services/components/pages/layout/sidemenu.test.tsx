import { describe, expect, test } from 'vitest';

import * as SideMenuModule from './sidemenu';

describe('SideMenuService', () => {
    test('getMenuItems returns not-empty items array', () => {
        const service = SideMenuModule.sideMenuService;
        const items = service.getMenuItems();
        expect(items.length).toBeGreaterThan(0);
    });
});

describe('Dashboard menu item', () => {
    test('getMenuItems returns dashboard item with correct properties', () => {
        const service = SideMenuModule.sideMenuService;
        const items = service.getMenuItems();
        const dashboardItem = items.find(item => item.label === "Dashboard")!;
        expect(dashboardItem).toBeDefined();
        expect(dashboardItem.url).toBe("/");
        expect(items.indexOf(dashboardItem)).toBe(0);
    });
});

describe('My Accounts menu item', () => {
    test('getMenuItems returns accounts item with correct properties', () => {
        const service = SideMenuModule.sideMenuService;
        const items = service.getMenuItems();
        const accountsItem = items.find(item => item.label === "My Accounts")!;
        expect(accountsItem).toBeDefined();
        expect(accountsItem.url).toBe("/my-accounts");
        expect(items.indexOf(accountsItem)).toBe(1);
    });

    test('isActive returns true for subpath of the item url', () => {
        const service = SideMenuModule.sideMenuService;
        const items = service.getMenuItems();
        const accountsItem = items.find(item => item.label === "My Accounts")!;
        expect(accountsItem.isActive("/my-accounts")).toBe(true);
        expect(accountsItem.isActive("/my-accounts/123")).toBe(true);
    });
});