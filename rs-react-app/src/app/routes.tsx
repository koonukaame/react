import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { App } = await import('../App');
      return { Component: App };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { Main } = await import('../pages');
          return { Component: Main };
        },
      },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      const { NotFound } = await import('../pages');
      return { Component: NotFound };
    },
  },
  {
    path: '/about',
    lazy: async () => {
      const { About } = await import('../pages');
      return { Component: About };
    },
  },
  {
    path: ':uid',
    lazy: async () => {
      const { Main } = await import('../pages');
      return { Component: Main };
    },
  },
]);
