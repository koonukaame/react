import { NavLink, Outlet, useLocation } from 'react-router';
import { Flyout, ThemeToggle } from '@components';

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

export const Layout = () => {
  const location = useLocation();

  return (
    <div
      className="box-border relative flex flex-col h-screen max-w p-6 dark:bg-neutral-900"
      data-testid="layout"
    >
      <header className="flex justify-between">
        <nav className="flex gap-6">
          {navigationLinks.map((nav) => {
            const isActive = location.pathname.startsWith(nav.path);

            return (
              <NavLink
                key={nav.text.toLowerCase()}
                to={nav.path}
                className={() =>
                  `text-white font-medium px-6 py-2 rounded-full shadow transition ${
                    isActive
                      ? 'bg-rose-700/80 dark:bg-rose-300 dark:text-stone-800 cursor-default'
                      : 'bg-stone-700/80 dark:bg-stone-400 hover:bg-rose-800 dark:hover:bg-stone-500 dark:text-stone-800 cursor-pointer'
                  }`
                }
              >
                {nav.text}
              </NavLink>
            );
          })}
        </nav>
        <ThemeToggle />
      </header>
      <main>
        <Outlet />
      </main>
      <Flyout />
    </div>
  );
};
