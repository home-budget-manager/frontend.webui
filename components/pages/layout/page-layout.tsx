"use client"

import { useState } from "react";

import HeaderComponent from "@/components/pages/layout/header";
import SideMenuComponent from "@/components/pages/layout/sidemenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
        <>
          <HeaderComponent setSidebarOpen={setSidebarOpen} />

          <div className="flex flex-1 overflow-hidden">
            <SideMenuComponent sidebarOpen={sidebarOpen} />
            {children}

          </div>
          {/* FOOTER */}
          <footer className="shrink-0 border-t border-border bg-card px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
              <div>© {new Date().getFullYear()} Fintra. All rights reserved.</div>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-foreground">Privacy</a>
                <a href="#" className="hover:text-foreground">Terms</a>
                <a href="#" className="hover:text-foreground">Support</a>
              </div>
            </div>
          </footer>
        </>
  );
}
