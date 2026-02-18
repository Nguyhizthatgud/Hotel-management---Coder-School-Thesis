"use client";
import "./globals.css";
import { Inter, Cherry_Bomb_One } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LoadingProvider } from "./components/LoadingProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const cherryBombOne = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherry-bomb",
  display: "swap",
  preload: false
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${cherryBombOne.variable}`}>
      <body className="min-h-screen" suppressHydrationWarning>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LoadingProvider>
              <main>{children}</main>
            </LoadingProvider>
          </ThemeProvider>
        </I18nextProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
