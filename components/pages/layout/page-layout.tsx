"use client"

import { useState } from "react";

import HeaderComponent from "./header";
import SideMenuComponent from "./sidemenu";
import FooterComponent from "./footer";

import styles from './page-layout.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className={styles["page-container"]}>
      <HeaderComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={styles["main-content"]}>
        <SideMenuComponent sidebarOpen={sidebarOpen} />
        {children}
      </div>
      <FooterComponent />
    </div>
  );
}
