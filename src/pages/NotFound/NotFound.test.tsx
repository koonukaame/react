import { expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';
import { MemoryRouter } from 'react-router';

it('NotFound page renders without error', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  const notFoundPage = screen.getByTestId('not-found');
  expect(notFoundPage).toBeInTheDocument();
});
