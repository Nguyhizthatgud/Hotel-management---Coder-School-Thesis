"use client";
import "./globals.css";
import { Inter, Cherry_Bomb_One } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LoadingProvider } from "./components/LoadingProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const cherryBombOne = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherry-bomb",
  display: "swap"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${cherryBombOne.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeProvider>
            <LoadingProvider>
              <main>{children}</main>
            </LoadingProvider>
          </ThemeProvider>
        </ThemeProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
