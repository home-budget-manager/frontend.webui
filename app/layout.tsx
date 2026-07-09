"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Calendar,
  PieChart,
  Target,
  Settings,
  Menu,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Briefcase,
  Zap,
  Film,
  CreditCard,
  PiggyBank,
  Landmark,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import HeaderComponent from "@/components/pages/layout/header";
import "./globals.css";
import styles from './layout.module.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Wallet, label: "Accounts" },
  { icon: ArrowLeftRight, label: "Operations" },
  { icon: Calendar, label: "Planned" },
  { icon: PieChart, label: "Reports" },
  { icon: Target, label: "Goals" },
  { icon: Settings, label: "Settings" },
];

const metadata: Metadata = {
  title: "Home Budget Manager",
  description: "Manage your home budget efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div className={styles["page-container"]}>
          {/* HEADER */}
          <HeaderComponent setSidebarOpen={setSidebarOpen} today={today} />

          <div className="flex flex-1 overflow-hidden">
            {/* SIDEBAR */}
            <aside
              className={`${sidebarOpen ? "w-60" : "w-0 -ml-px"
                } shrink-0 overflow-hidden bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out`}
            >
              <nav className="flex h-full w-60 flex-col gap-1 p-4">
                <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                  Menu
                </div>
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${item.active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                ))}
              </nav>
            </aside>
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
        </div>
      </body>
    </html>
  );
}
