import { NavLink, Outlet } from 'react-router';

const navigationLinks = [
  {
    to: { pathname: '/', search: '?page=1' },
    text: 'Main',
  },
  {
    to: { pathname: '/about' },
    text: 'About',
  },
];

export function Layout() {
  return (
    <div
      className="flex flex-col min-h-screen max-w overflow-hidden p-6"
      data-testid="layout"
    >
      <header>
        <nav className="flex gap-6">
          {navigationLinks.map((nav) => (
            <NavLink
              key={nav.text.toLowerCase()}
              to={nav.to}
              className={({ isActive }) =>
                `block text-white font-medium px-6 py-2 rounded-full shadow transition ${
                  isActive
                    ? 'bg-rose-700/80'
                    : 'bg-stone-700/80 hover:bg-rose-800'
                }`
              }
              onClick={(e) => {
                if (window.location.pathname === nav.to.pathname) {
                  e.preventDefault();
                }
              }}
            >
              {nav.text}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
