import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/fonts.scss";
import "../styles/tokens.scss";
import "../styles/themes.scss";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Home Budget Manager",
  description: "Manage your home budget efficiently",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en">
      <body>
        <NextIntlClientProvider>
            {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
