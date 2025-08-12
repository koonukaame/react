'use client';
import { Flyout, ThemeToggle } from '@components';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigationLinks = [
  {
    path: '/character',
    text: 'Main',
  },
  {
    path: '/about',
    text: 'About',
  },
];

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <div
      className="box-border relative flex flex-col h-screen max-w px-6 py-3 dark:bg-neutral-900"
      data-testid="layout"
    >
      <header className="flex justify-between">
        <nav className="flex gap-6">
          {navigationLinks.map((nav) => {
            const isActive = pathname.startsWith(nav.path);

            return (
              <Link
                key={nav.text.toLowerCase()}
                href={nav.path}
                className={`text-white font-medium px-6 py-2 rounded-full shadow transition ${
                  isActive
                    ? 'bg-rose-700/80 dark:bg-rose-300 dark:text-stone-800 cursor-default'
                    : 'bg-stone-700/80 dark:bg-stone-400 hover:bg-rose-800 dark:hover:bg-stone-500 dark:text-stone-800 cursor-pointer'
                }`}
              >
                {nav.text}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
      </header>
      <main>{children}</main>
      <Flyout />
    </div>
  );
};
