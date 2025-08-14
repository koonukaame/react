import { Flyout, ThemeToggle } from '@components';
import type { ReactNode } from 'react';
import { StoreProvider } from 'src/app/providers';
import { Navigation } from '@shared';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div
      className="box-border relative flex flex-col h-screen max-w px-6 py-3 dark:bg-neutral-900"
      data-testid="layout"
    >
      <header className="flex justify-between">
        <Navigation />
        <ThemeToggle />
      </header>
      <main>{children}</main>
      <StoreProvider>
        <Flyout />
      </StoreProvider>
    </div>
  );
};
