import { NavLink, Outlet, useLocation } from 'react-router';

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

export function Layout() {
  const location = useLocation();

  return (
    <div
      className="flex flex-col min-h-screen max-w overflow-hidden p-6"
      data-testid="layout"
    >
      <header>
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
                      ? 'bg-rose-700/80 cursor-default'
                      : 'bg-stone-700/80 hover:bg-rose-800 cursor-pointer'
                  }`
                }
              >
                {nav.text}
              </NavLink>
            );
          })}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
