"use client";

import { useState } from "react";

import Link from "next/link";

import { ChevronDown, ChevronRight } from "lucide-react";

import styles from "./navigation.module.scss";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className={styles.navigation}>
            <a onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <ChevronDown /> : <ChevronRight />}</a>
            <ul className={isMenuOpen ? styles.navigationOpen : styles.navigationClosed}>
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/incomes">Incomes</Link></li>
                <li><Link href="/outcomes">Outcomes</Link></li>
                <li><Link href="/transfers">Transfers</Link></li>
            </ul>
        </nav>
    );
}