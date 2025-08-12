import { createBrowserRouter, redirect } from 'react-router';
import { Layout } from 'src/view';
import { CharacterWidget } from '@widget';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/',
        loader: () => redirect('/character'),
      },
      {
        path: '/character',
        lazy: async () => {
          const { Main } = await import('../../view');
          return { Component: Main };
        },
        children: [
          {
            path: ':uid',
            element: <CharacterWidget />,
          },
        ],
      },
      {
        path: '/about',
        lazy: async () => {
          const { About } = await import('../../view');
          return { Component: About };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFound } = await import('../../view');
          return { Component: NotFound };
        },
      },
    ],
  },
]);
