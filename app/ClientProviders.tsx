"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { LoadingProvider } from "./components/LoadingProvider";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";
import { Suspense } from "react";

export function ClientProviders({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <LoadingProvider>
          <Suspense fallback={null}>
            <main>{children}</main>
          </Suspense>
        </LoadingProvider>
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </I18nextProvider>
  );
}
