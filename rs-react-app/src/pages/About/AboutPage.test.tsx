import { expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { About } from './AboutPage';
import { MemoryRouter } from 'react-router';

it('About page renders without error', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );

  const aboutPage = screen.getByTestId('about-page');
  expect(aboutPage).toBeInTheDocument();
});
