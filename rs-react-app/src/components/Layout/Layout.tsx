import { NavLink, Outlet, useLocation } from 'react-router';

export function Layout() {
  const location = useLocation();

  const NavLinkMap = [
    {
      path: '/',
      text: 'Main',
      isActive:
        location.pathname === '/' || location.pathname.startsWith('/character'),
    },
    {
      path: '/about',
      text: 'About',
      isActive: location.pathname === '/about',
    },
  ];
  return (
    <div className="flex flex-col min-h-screen max-w overflow-hidden p-6">
      <header>
        <nav className="flex gap-6">
          {NavLinkMap.map((nav) => (
            <NavLink
              key={nav.text.toLowerCase()}
              to={nav.path}
              className={() =>
                `text-white font-medium px-6 py-2 rounded-full shadow transition ${
                  nav.isActive
                    ? 'bg-rose-700/80 cursor-default'
                    : 'bg-stone-700/80 hover:bg-rose-800 cursor-pointer'
                }`
              }
              onClick={(e) => {
                if (nav.isActive) {
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
