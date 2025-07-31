import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Layout } from './Layout';
import { createRoutesStub } from 'react-router';
import '@testing-library/jest-dom';

it('renders Layout page without errors', () => {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: Layout,
    },
  ]);

  render(<Stub initialEntries={['/']} />);

  const layout = screen.getByTestId('layout');
  expect(layout).toBeInTheDocument();
});
