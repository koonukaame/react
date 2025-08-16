import type { ReactNode } from 'react';
import App from '../../src/app/App';
import './globals.css';
import { Flyout, ThemeToggle } from '../../src/components';
import { Navigation } from '../../src/shared';
import { hasLocale } from 'next-intl';
import { routing } from '../../src/i18n';
import { notFound } from 'next/navigation';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>Startrack API</title>
      </head>
      <body>
        <App>
          <div
            className="box-border relative flex flex-col h-screen max-w px-6 py-3 dark:bg-neutral-900"
            data-testid="layout"
          >
            <header className="flex justify-between">
              <Navigation />
              <ThemeToggle />
            </header>
            <main>{children}</main>
            <Flyout />
          </div>
        </App>
      </body>
    </html>
  );
}
