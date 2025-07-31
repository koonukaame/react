import { createBrowserRouter } from 'react-router';
import { Layout } from '../components';
import { CharacterWidget } from '../widget/CharacterWidget/CharacterWidget';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/',
        lazy: async () => {
          const { Main } = await import('../pages');
          return { Component: Main };
        },
        children: [
          {
            path: '/:uid',
            element: <CharacterWidget />,
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
