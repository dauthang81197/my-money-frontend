import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react';
import './global.css';
import Providers from '../providers/providers';
import { AuthProvider } from '../providers/auth-providers';
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <AuthProvider> {children}</AuthProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
