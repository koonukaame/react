import { expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { About } from './AboutPage';
import { createRoutesStub } from 'react-router';

it('About page renders without error', () => {
  const Stub = createRoutesStub([
    {
      path: '/about',
      Component: About,
    },
  ]);

  render(<Stub initialEntries={['/about']} />);

  const aboutPage = screen.getByTestId('about-page');
  expect(aboutPage).toBeInTheDocument();
});
