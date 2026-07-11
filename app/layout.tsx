import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PageLayout from "@/components/pages/layout/page-layout";
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

export const metadata: Metadata = {
  title: "Home Budget Manager",
  description: "Manage your home budget efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div className={styles["page-container"]}>
          <PageLayout>
            {children}
          </PageLayout>
        </div>
      </body>
    </html>
  );
}
