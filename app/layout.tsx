import type { ReactNode } from 'react';
import App from '../src/app/App';
import './globals.css';
import { Flyout, ThemeToggle } from '@components';
import { Navigation } from '@shared';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
