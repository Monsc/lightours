'use client';
import * as React from "react";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import messages from './i18n/zh.json';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <html lang="zh">
      <body>
        <NextIntlClientProvider messages={messages} locale="zh">
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 