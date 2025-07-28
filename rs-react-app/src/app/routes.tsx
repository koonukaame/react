import { createBrowserRouter } from 'react-router';
import { ResultDisplay } from '../components';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { App } = await import('../App');
      return { Component: App };
    },
    children: [
      {
        lazy: async () => {
          const { Main } = await import('../pages');
          return { Component: Main };
        },
        children: [
          {
            index: true,
            element: <ResultDisplay />,
          },
          {
            path: 'character/:uid',
            element: <ResultDisplay />,
          },
        ],
      },
      {
        path: '/about',
        lazy: async () => {
          const { About } = await import('../pages');
          return { Component: About };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFound } = await import('../pages');
          return { Component: NotFound };
        },
      },
    ],
  },
]);
